<template>
  <div v-if="isSignup">
    <DashBoardNavbar></DashBoardNavbar>
    <ToastNotification></ToastNotification>
    <router-view></router-view>
  </div>
</template>

<script>
import DashBoardNavbar from '../components/DashBoardNavbar.vue';
import ToastNotification from '../components/ToastNotification.vue';

export default {
  data() {
    return {
      isSignup: false,
    };
  },
  components: {
    DashBoardNavbar,
    ToastNotification,
  },
  methods: {
    checkSignup() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)sevenWeekToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .post(`${process.env.VUE_APP_API_BASEURL}/api/user/check`)
          .then(() => {
            this.isSignup = true;
            this.$httpMessageState({
              style: 'success',
              title: '登入',
              content: '登入成功囉',
            });
          })
          .catch((err) => {
            console.dir(err);
            this.$httpMessageState({
              style: 'danger',
              title: '登入',
              content: err.response.data.message,
            });
          });
      } else {
        this.$router.push('/');
      }
    },
  },
  created() {
    this.checkSignup();
  },
};
</script>
