<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="!connected" class="mb-4">
      <input
        v-model="gameId"
        placeholder="Enter Game ID"
        class="border p-2 rounded w-full mb-2"
        @keyup.enter="joinGame"
      />
      <v-btn
        @click="joinGame"
        color="primary"
      >
        Join Game
      </v-btn>
    </div>

    <div v-else>
      <div class="mb-4">
        <p class="font-bold">Player ID: {{ playerId }}</p>
        <input
          v-model="message"
          placeholder="Type a message"
          class="border p-2 rounded w-full"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
        >
          Send
        </button>
      </div>

      <div class="border h-64 overflow-y-auto p-4 bg-gray-100 rounded">
        <p v-for="(msg, index) in messages" :key="index" class="mb-2 text-slate-800 text-left">
          <span class="font-bold">{{ msg.playerId }}</span>: {{ msg.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameId: '',
      message: '',
      messages: [],
      connected: false,
      playerId: null,
      ws: null,
    };
  },
  methods: {
    joinGame() {
      if (!this.gameId) return;

      this.ws = new WebSocket('ws://localhost:3001');
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({ type: 'join', gameId: this.gameId }));
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'init':
            this.playerId = data.playerId;
            this.connected = true;
            this.messages.push({ playerId: 'System', message: data.message });
            break;
          case 'playerJoined':
          case 'playerLeft':
          case 'message':
            this.messages.push({ playerId: data.playerId, message: data.message });
            break;
        }
        // Auto-scroll to the bottom
        this.$nextTick(() => {
          const container = this.$el.querySelector('.overflow-y-auto');
          container.scrollTop = container.scrollHeight;
        });
      };

      this.ws.onclose = () => {
        this.connected = false;
        this.messages.push({ playerId: 'System', message: 'Disconnected' });
      };
    },
    sendMessage() {
      if (!this.message.trim() || !this.connected) return;
      this.ws.send(JSON.stringify({ type: 'text', message: this.message }));
      this.messages.push({ playerId: this.playerId, message: this.message })
      this.message = '';
    },
  },
  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  },
};
</script>

<style scoped>
/* Tailwind handles most styling, but you can add custom scoped styles here if needed */
</style>
