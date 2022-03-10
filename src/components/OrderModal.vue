<template>
  <div>
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      aria-labelledby="orderModal"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">檢視訂單</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                <h5>訂單資訊</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">訂單編號： {{ order.id }}</li>
                  <li class="list-group-item">訂單日期： {{ order.create_at }}</li>
                  <li class="list-group-item">總金額： {{ order.total }}</li>
                  <li class="list-group-item">付款狀態：
                    <span v-if="order.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <h5>訂購人資訊</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">姓名： {{ order.user?.name }}</li>
                  <li class="list-group-item">信箱： {{ order.user?.email }}</li>
                  <li class="list-group-item">電話： {{ order.user?.tel }}</li>
                  <li class="list-group-item">地址： {{ order.user?.address }}</li>
                </ul>
              </div>
            </div>
            <h5 class="text-center mt-3">訂購商品</h5>
            <table class="table table-borderless table-hover">
              <thead>
                <tr class="border-bottom">
                  <th scope="col">名稱</th>
                  <th scope="col">單價</th>
                  <th scope="col">數量/單位</th>
                  <th scope="col">單項總金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <th scope="row">{{ item.product.title }}</th>
                  <td>{{ item.product.price }}</td>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td>NT$ {{ item.total }}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-center">
              <h5>留言</h5>
              <p v-if="order.message">{{ order.message }}</p>
              <p v-else>這筆訂單沒有留言喔~</p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalControl from '../mixins/modalControl';

export default {
  mixins: [modalControl],
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
};
</script>
