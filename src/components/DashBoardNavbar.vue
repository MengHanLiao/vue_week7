<template>
  <div class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/admin/products"
        >後台管理</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse flex justify-content-between"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders"
              >訂單列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupouns"
              >優惠券列表</router-link
            >
          </li>
        </ul>
        <button type="button" class="btn btn-success" @click="logout">
          登出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$http.post(`${process.env.VUE_APP_API_BASEURL}/logout`).then(() => {
        // eslint-disable-next-line no-alert
        alert('登出成功');
        this.$router.push('/');
      }).catch((err) => {
        console.dir(err);
      });
    },
  },
};
</script>
