<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between mb-3">
      <h2>訂單列表</h2>
      <button class="btn btn-danger" type="button" @click="openDeleteModal(true)">刪除所有訂單</button>
    </div>
    <div class="tabel-responsive">
      <table class="table align-middle mb-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>商品項目</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th class="text-end">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="orders.length === 0">
            <tr>
              <td colspan="6">目前沒有訂單</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ changeDate(order.create_at) }}</td>
              <td>{{ order.user.email }}</td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="product in order.products" :key="product.id">
                    {{ product.product.title }} 數量：{{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td>{{ order.total }}</td>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`isPaidfor${order.id}`"
                    :checked="order.is_paid"
                    @change="updateOrderPaid(order)"
                  />
                  <label class="form-check-label" :for="`isPaidfor${order.id}`">
                    <span v-if="order.is_paid" class="text-success">已付款</span>
                    <span v-else class="text-danger">未付款</span>
                  </label>
                </div>
              </td>
              <td class="text-end">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="openOrderModal(order)"
                  >
                    檢視
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="openDeleteModal(false, order)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <PaginationComponent :page-data="pagination" @emit-page="getOrders"></PaginationComponent>
    </div>
    <DeleteConfirm
      ref="deleteModal"
      :delete-item="tempOrder"
      @emit-delete="deleteOrder"
    ></DeleteConfirm>
    <OrderModal ref="orderModal" :order="tempOrder" @emit-page="getOrders"></OrderModal>
  </div>
</template>

<script>
import PaginationComponent from '../components/PaginationComponent.vue';
import OrderModal from '../components/OrderModal.vue';
import DeleteConfirm from '../components/DeleteConfirm.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isDeleteAll: false,
    };
  },
  components: {
    PaginationComponent,
    OrderModal,
    DeleteConfirm,
  },
  methods: {
    getOrders(target = 1) {
      const loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${target}`,
        )
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          loader.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
          loader.hide();
        });
    },
    updateOrderPaid(order) {
      this.tempOrder = { ...order };
      this.tempOrder.is_paid = !order.is_paid;
      this.$http
        .put(
          `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`,
          { data: this.tempOrder },
        ).then((res) => {
          alert(res.data.message);
          this.getOrders();
        }).catch((err) => {
          alert(err.response.data.message);
        });
    },
    openOrderModal(order) {
      this.tempOrder = { ...order };
      this.tempOrder.create_at = this.changeDate(order.create_at);
      const orderComponent = this.$refs.orderModal;
      orderComponent.openModal();
    },
    changeDate(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString();
    },
    openDeleteModal(isAll, order) {
      if (isAll) {
        this.isDeleteAll = true;
      } else {
        this.isDeleteAll = false;
        this.tempOrder = { ...order };
        this.tempOrder.create_at = this.changeDate(order.create_at);
      }
      const deleteComponent = this.$refs.deleteModal;
      deleteComponent.openModal();
    },
    deleteOrder() {
      let url = `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      if (this.isDeleteAll) {
        url = `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      }
      this.$http.delete(url).then((res) => {
        this.getOrders();
        const deleteComponent = this.$refs.deleteModal;
        deleteComponent.closeModal();
        alert(res.data.message);
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
