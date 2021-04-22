<template>
  <div class="container">
    <label>File</label>
    <input type="file" id="file" ref="file" />
    <button @click="generate()">Сгенирировать</button>

    <table class="products" v-if="products.length > 0">
      <caption>
        Ваши загруженные товары
      </caption>
      <thead>
        <tr>
          <th>Название</th>
          <th>Стоимость</th>
          <th>Количество</th>
          <th>Описание</th>
        </tr>
      </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{product.name}}</td>
                <td>{{product.cost}}</td>
                <td>{{product.count}}</td>
                <td>{{product.description}}</td>
            </tr>
        </tbody>

    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      products: [],
    };
  },
  methods: {
    generate() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("api/generateProducts", formData, {
          headers: {
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then((response) => {
          response.data.forEach((product) => this.products.push(product));
          console.log(response.data);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>

