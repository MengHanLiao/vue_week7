<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-4">
        <h2 class="text-center mb-3">後台登入</h2>
        <form>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="userEmail"
              required="required"
              placeholder="請輸入 Email"
              v-model="user.username"
            />
            <label for="userEmail">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="userPassword"
              required="required"
              placeholder="請輸入密碼"
              v-model="user.password"
            />
            <label for="userPassword">密碼</label>
          </div>
          <button
            type="button"
            class="btn btn-primary w-100"
            @click="signin"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const loader = this.$loading.show();
      this.$http
        .post(`${process.env.VUE_APP_API_BASEURL}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `sevenWeekToken=${token}; expires=${new Date(expired)};`;
          loader.hide();
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          loader.hide();
          // eslint-disable-next-line no-alert
          alert(err.response.data.message);
        });
    },
  },
};
</script>
