<template>
  <v-simple-table class="products mt-3">
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
</template>

<script>
export default {
  props: {
    products: Array,
  },
};
</script>
