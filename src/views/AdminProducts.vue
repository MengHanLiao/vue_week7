<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between mb-3">
      <h2>產品列表</h2>
      <button class="btn btn-primary" type="button" @click="openProductModal(true)">
        新增產品
      </button>
    </div>
    <div class="table-responsive">
      <table class="table align-middle mb-4">
        <thead>
          <tr>
            <th scope="col" width="120px">主圖</th>
            <th scope="col">類型</th>
            <th scope="col">名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">上架</th>
            <th scope="col" class="text-end">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="products.length === 0">
            <tr>
              <th colspan="5">目前沒有商品，新增商品吧！</th>
            </tr>
          </template>
          <template v-else>
            <tr v-for="product in products" :key="product.id">
              <td>
                <img :src="product.imageUrl" alt="" class="table-img" />
              </td>
              <td>{{ product.title }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.origin_price }}</td>
              <td>{{ product.price }}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success fw-bold">已上架</span>
                <span v-else class="text-danger fw-bold">未上架</span>
              </td>
              <td class="text-end">
                <div class="btn-group" role="group" aria-label="operateBtn">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="openProductModal(false, product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="openDeleteModal(product)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <PaginationComponent
        :page-data="pagination"
        @emit-page="getProducts"
      ></PaginationComponent>
    </div>
    <productModal
      ref="productModal"
      :product="tempProduct"
      @emit-product="updateProduct"
    ></productModal>
    <deleteConfirm
      ref="deleteModal"
      :delete-item="tempProduct"
      @emit-delete="deleteProduct"
    ></deleteConfirm>
  </div>
</template>

<style>
.table-img {
  width: 100px;
  height: 75px;
  object-fit: cover;
}
</style>

<script>
import PaginationComponent from '../components/PaginationComponent.vue';
import productModal from '../components/ProductModal.vue';
import deleteConfirm from '../components/DeleteConfirm.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: true,
    };
  },
  components: {
    PaginationComponent,
    productModal,
    deleteConfirm,
  },
  methods: {
    getProducts(target = 1) {
      const loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/products?page=${target}`,
        )
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          loader.hide();
        })
        .catch((err) => {
          console.dir(err);
          loader.hide();
        });
    },
    openProductModal(isNew, product) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = product;
        this.isNew = false;
      }
      const controlPrdouctModal = this.$refs.productModal;
      controlPrdouctModal.openModal();
    },
    updateProduct(obj) {
      let method = 'post';
      let url = `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/product`;
      if (!this.isNew) {
        method = 'put';
        url = `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      }
      this.$http[method](url, { data: obj })
        .then((res) => {
          this.$httpMessageState({
            style: 'success',
            title: '產品更新',
            content: res.data.message,
          });
          this.getProducts();
          const controlPrdouctModal = this.$refs.productModal;
          controlPrdouctModal.closeModal();
        })
        .catch((err) => {
          this.$httpMessageState({
            style: 'danger',
            title: '產品更新',
            content: err.response.data.message,
          });
        });
    },
    openDeleteModal(product) {
      this.tempProduct = { ...product };
      const controlDeleteModal = this.$refs.deleteModal;
      controlDeleteModal.openModal();
    },
    deleteProduct() {
      this.$http
        .delete(
          `${process.env.VUE_APP_API_BASEURL}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`,
        )
        .then((res) => {
          this.$httpMessageState({
            style: 'success',
            title: '產品刪除',
            content: res.data.message,
          });
          this.getProducts();
          const controlDeleteModal = this.$refs.deleteModal;
          controlDeleteModal.closeModal();
        })
        .catch((err) => {
          this.$httpMessageState({
            style: 'danger',
            title: '產品刪除',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
