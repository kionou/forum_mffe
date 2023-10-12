<template>
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Précédent</button>
      <span v-for="pageNumber in pageNumbers" :key="pageNumber">
        <button @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">{{ pageNumber }}</button>
      </span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: Number,
      totalPages: Number,
    },
    computed: {
      pageNumbers() {
        const currentPage = this.currentPage;
        const totalPages = this.totalPages;
        const numbers = [];
  
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
          numbers.push(i);
        }
  
        return numbers;
      },
    },
    methods: {
      goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.$emit('page-change', pageNumber);
        }
      },
    },
  };
  </script>
  
  <style scoped>
 .pagination {
  display: flex;
  align-items: center;
  justify-content: center;

}

.pagination button {
  border: none;
  background-color: #f5f5f5;
  color: #333;
  padding: 6px 12px;
  margin: 0 2px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.pagination button:hover {
  background-color: #e0e0e0;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination button.active {
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
}

</style>
  