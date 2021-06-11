<template>
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
        <th class="text-center">QR</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.cost }}</td>
        <td>{{ product.count }}</td>
        <td>{{ product.description }}</td>
        <td><img :src="`data:image/png;base64,${product.qr}`" alt="qr" /></td>
        <td>
          <v-btn depressed color="error" @click="deleteProduct(product.id)">
            <i class="fa fa-trash"></i>
          </v-btn>
        </td>
        <td>
          <v-btn color="primary" @click="editItem(product)">
            <i class="fa fa-pencil"></i>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    products: Array,
    deleteProduct: Function,
    editItem: Function,
  },
};
</script>
