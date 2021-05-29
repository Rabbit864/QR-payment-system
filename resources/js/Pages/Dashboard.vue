<template>
  <div class="container">
    <nav-bar></nav-bar>
    <v-file-input
      chips
      truncate-length="19"
      label="Загрузите csv файл продукта"
      ref="file"
      v-model="files"
      class="mt-5"
    ></v-file-input>
    <v-btn elevation="2" outlined @click="generate()">Сгенирировать</v-btn>

    <v-simple-table class="products mt-3" v-if="products.length > 0">
      <caption>
        Ваши загруженные товары
      </caption>
      <thead>
        <tr>
          <th class="text-center">Название</th>
          <th class="text-center">Стоимость</th>
          <th class="text-center">Количество</th>
          <th class="text-center">Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.cost }}</td>
          <td>{{ product.count }}</td>
          <td>{{ product.description }}</td>
          <td><img :src="`data:image/png;base64,${product.qr}`" alt="qr" /></td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
/*global axios*/
import NavBar from "./Navbar.vue";

export default {
  components: { NavBar },
  data() {
    return {
      files: [],
      products: [],
    };
  },
  methods: {
    generate() {
      let formData = new FormData();
      formData.append("file", this.files);
      formData.append("user_id", this.$store.state.user.id);
      axios
        .post("api/generateProducts", formData)
        .then((response) => {
          response.data.forEach((product) => this.products.push(product));
        })
        .catch(function () {});
    },
  },
};
</script>

