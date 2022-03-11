<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModal"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">編輯產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-lg-8">
                <div class="row justify-content-md-center">
                  <div class="mb-3">
                    <label for="productName" class="form-label">商品名稱</label>
                    <input
                      v-model.trim="tempProduct.title"
                      type="text"
                      class="form-control"
                      id="productName"
                      placeholder="商品名稱"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="productCategory" class="form-label">類別</label>
                    <input
                      v-model.trim="tempProduct.category"
                      type="text"
                      class="form-control"
                      id="productCategory"
                      placeholder="類別"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="productUnit" class="form-label">單位</label>
                    <input
                      v-model.trim="tempProduct.unit"
                      type="text"
                      class="form-control"
                      id="productUnit"
                      placeholder="碗、份"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="originalPrice" class="form-label">原價</label>
                    <input
                      v-model.number="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      id="originalPrice"
                      placeholder="請填入數字"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="productPrice" class="form-label">售價</label>
                    <input
                      v-model.number="tempProduct.price"
                      type="number"
                      class="form-control"
                      id="productName"
                      placeholder="請填入數字"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="productName" class="form-label"
                      >內容與成分</label
                    >
                    <input
                      v-model.trim="tempProduct.content"
                      type="text"
                      class="form-control"
                      id="productPrice"
                      placeholder="內容與成分"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="productDescription" class="form-label"
                      >商品描述</label
                    >
                    <textarea
                      v-model.trim="tempProduct.description"
                      class="form-control"
                      id="productDescription"
                      rows="3"
                      placeholder="說點什麼..."
                    ></textarea>
                  </div>
                  <div class="form-check mb-3">
                    <input
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      class="form-check-input ms-0 me-1"
                      type="checkbox"
                      id="isEnable"
                    />
                    <label class="form-check-label" for="isEnable">
                      是否上架
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 mb-3">
                <h5>圖片區域</h5>
                <div class="mb-3">
                  <label for="mainPicture" class="form-label">主要商品圖</label>
                  <input
                    v-model.trim="tempProduct.imageUrl"
                    class="form-control"
                    type="text"
                    id="mainPicture"
                    placeholder="輸入圖片網址"
                  />
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                </div>
                <div>
                  <p>輔助商品圖</p>
                  <template v-if="Array.isArray(tempProduct.imagesUrl)">
                    <div v-for="(image, key) in tempProduct.imagesUrl" :key="`${key}+245134`">
                      <input
                        v-model.trim="tempProduct.imagesUrl[key]"
                        class="form-control"
                        type="text"
                        placeholder="輸入圖片網址"
                      />
                      <img class="img-fluid" :src="tempProduct.imagesUrl[key]" alt="" />
                    </div>
                    <button
                      type="button"
                      v-if="
                        !tempProduct.imagesUrl.length ||
                        tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                      "
                      class="btn btn-outline-primary w-100 my-2"
                      @click="tempProduct.imagesUrl.push('')"
                    >
                      新增
                    </button>
                    <button
                      type="button"
                      v-else
                      class="btn btn-outline-danger w-100"
                      @click="tempProduct.imagesUrl.pop('')"
                    >
                      刪除
                    </button>
                  </template>
                  <div v-else>
                    <button
                      type="button"
                      class="btn btn-outline-primary w-100 my-2"
                      @click="this.tempProduct.imagesUrl = ['']"
                    >
                      新增
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalControl from '../mixins/modalControl';

export default {
  mixins: [modalControl],
  props: ['product'],
  data() {
    return {
      tempProduct: {},
    };
  },
  watch: {
    product() {
      this.tempProduct = {};
      if (Object.keys(this.product).length) {
        this.tempProduct = JSON.parse(JSON.stringify(this.product));
      }
    },
  },
  methods: {
    updateProduct() {
      this.$emit('emit-product', this.tempProduct);
    },
  },
};
</script>
