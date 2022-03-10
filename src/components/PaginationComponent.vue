<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pageData.has_pre }">
          <a
            class="page-link"
            @click.prevent="changePage(pageData.current_page-1)"
            @keyup.prevent="changePage(pageData.current_page-1)"
            >Previous</a
          >
        </li>
        <li
          class="page-item"
          v-for="(page, index) in pageData.total_pages"
          :key="index + 'sjisaie'"
          :class="{active: page === pageData.current_page}"
        >
          <a class="page-link"
            @click.prevent="changePage(page)"
            @keyup.prevent="changePage(page)"
            >{{ page }}</a
          >
        </li>
        <li class="page-item" :class="{ disabled: !pageData.has_next }">
          <a
            class="page-link"
            @click.prevent="changePage(pageData.current_page+1)"
            @keyup.prevent="changePage(pageData.current_page+1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pageData'],
  methods: {
    changePage(target) {
      this.$emit('emit-page', target);
    },
  },
};
</script>
