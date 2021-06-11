<template>
  <div class="container">
    <nav-bar-menu></nav-bar-menu>
    <v-file-input
      chips
      truncate-length="19"
      label="Загрузите csv файл продукта"
      ref="file"
      v-model="files"
      class="mt-5"
    ></v-file-input>
    <v-btn elevation="2" outlined @click="generate()">Сгенирировать</v-btn>
    <product-table v-if="products.length > 0" :products="products"></product-table>
  </div>
</template>

<script>
/* global axios */
import NavBarMenu from '../Components/NavbarMenu.vue';
import ProductTable from '../Components/ProductTable.vue';

export default {
  components: { NavBarMenu, ProductTable },
  data() {
    return {
      files: [],
      products: [],
    };
  },
  methods: {
    generate() {
      const formData = new FormData();
      formData.append('file', this.files);
      formData.append('user_id', this.$store.state.user.id);
      axios
        .post('api/generateProducts', formData)
        .then((response) => {
          response.data.forEach((product) => this.products.push(product));
        })
        .catch(() => {});
    },
  },
};
</script>
