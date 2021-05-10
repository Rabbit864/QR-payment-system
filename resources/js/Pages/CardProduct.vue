<template>
  <div class="container">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-title>
        <div class="font-weight-black">{{ this.name }}</div>
      </v-card-title>
      <v-card-title>
        <div>Стоимость: {{ this.cost }}</div>
      </v-card-title>
      <v-card-text>
        <div class="text-left">Описание: {{ this.description }}</div>
      </v-card-text>
      <GooglePay />
    </v-card>
  </div>
</template>

<script>
import GooglePay from "./GooglePay.vue";
export default {
  components: { GooglePay },
  data() {
    return {
      name: "",
      cost: "",
      description: "",
      img: "",
    };
  },
  methods: {
    read() {
      const url = `api/products/${this.$route.params.id}`;
      axios
        .get(url)
        .then((response) => {
          const product = response.data;
          this.name = product.name;
          this.cost = product.cost;
          this.description = product.description;
          this.img = product.image;
        })
        .catch(function () {});
    },
  },
  created() {
    this.read();
  },
};
</script>

