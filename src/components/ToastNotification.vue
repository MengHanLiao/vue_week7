<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1500">
    <div
      class="toast show mb-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-for="(msg, key) in messages"
      :key="key+133445"
    >
      <div class="toast-header">
        <span
          class="p-2 rounded me-2 d-inline-block bg-success"
          :class="`bg-${msg.style}`"
        ></span>
        <strong class="me-auto">更新</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{{ msg.content }}</div>
    </div>
  </div>
</template>

<script>
import emitter from '../../libs/emitter';

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    showToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    emitter.on('push-message', (obj) => {
      const { style, title, content } = obj;
      this.messages.push({ style, title, content });
      this.showToast();
    });
  },
};
</script>
