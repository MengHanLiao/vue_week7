<template>
  <div>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModal"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">再次確認</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>確認刪除 {{ deleteItem.title }} ？</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="executeDelete">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalControl from '../mixins/modalControl';

export default {
  props: ['deleteItem'],
  mixins: [modalControl],
  methods: {
    executeDelete() {
      this.$emit('emit-delete');
    },
  },
};
</script>
