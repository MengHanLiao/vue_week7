<template>
  <div v-if="isSignup">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/admin/products">後台管理</router-link>
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
              <router-link class="nav-link" to="/admin/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/orders">訂單列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupouns">優惠券列表</router-link>
            </li>
          </ul>
          <button type="button" class="btn btn-success" @click="logout">登出</button>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import DashBoardNavbar from '../components/DashBoardNavbar.vue';

export default {
  data() {
    return {
      isSignup: false,
    };
  },
  components: [
    DashBoardNavbar,
  ],
  methods: {
    checkSignup() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)sevenWeekToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http.post(`${process.env.VUE_APP_API_BASEURL}/api/user/check`).then(() => {
          this.isSignup = true;
        }).catch((err) => {
          console.dir(err);
        });
      } else {
        alert('請先登入');
        this.$router.push('/');
      }
    },
    logout() {
      this.$http.post(`${process.env.VUE_APP_API_BASEURL}/logout`).then((res) => {
        console.log(res);
        alert('登出成功');
        this.$router.push('/');
      }).catch((err) => {
        console.dir(err);
      });
    },
  },
  mounted() {
    this.checkSignup();
  },
};
</script>
