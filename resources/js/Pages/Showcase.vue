<template>
  <div class="container">
    <nav-bar></nav-bar>
    <v-simple-table class="products mt-3">
      <caption>
        Ваши товары
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
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import NavBar from "./Navbar.vue";

export default {
  components: { NavBar },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async read() {
      const url = `api/user/${this.$store.state.user.id}/products`;
      axios.get(url).then((response) => {
          response.data.forEach((product) => this.products.push(product));
        })
        .catch(function () {
          console.log("FAILURE!!");
        });;
    },
  },
  created() {
    this.read();
  }
};
</script>
