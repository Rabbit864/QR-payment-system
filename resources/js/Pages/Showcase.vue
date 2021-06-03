<template>
  <div class="container">
    <nav-bar></nav-bar>
    <v-alert dense outlined type="error" class="mt-2" v-if="hasError">
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item v-for="(error, index) in errors" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ error }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-alert>
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
    <v-dialog v-model="showEditForms" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Редактирование товара</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editProduct.name"
                  label="Название"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editProduct.cost"
                  type="number"
                  label="Цена"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editProduct.count"
                  type="number"
                  label="Количество"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editProduct.description"
                  label="Описание"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showEditForms = false">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateProduct">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NavBar from "./Navbar.vue";
/*global axios  */
export default {
  components: { NavBar },
  data() {
    return {
      products: [],
      showEditForms: false,
      editProduct: {
        name: "",
        cost: 0,
        count: 0,
        description: "",
      },
      editIndex: 0,
      hasError: false,
      errors: [],
    };
  },
  methods: {
    async read() {
      const url = `api/user/${this.$store.state.user.id}/products`;
      axios
        .get(url)
        .then((response) => {
          response.data.forEach((product) => this.products.push(product));
        })
        .catch(function (error) {
          console.log(error);
          this.hasError = true;
          this.errors.push(error);
        });
    },
    deleteProduct(id) {
      const url = `api/products/${id}`;
      axios
        .delete(url)
        .then(() => {
          const index = this.products.findIndex((product) => product.id === id);
          this.products.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
          this.hasError = true;
          this.errors.push(error);
        });
    },
    editItem(product) {
      this.editIndex = this.products.indexOf(product);
      this.editProduct = Object.assign({}, product);
      this.showEditForms = true;
    },
    updateProduct() {
      const url = `api/products/${this.editProduct.id}`;
      axios
        .put(url, {
          name: this.editProduct.name,
          cost: this.editProduct.cost,
          count: this.editProduct.count,
          description: this.editProduct.description,
        })
        .then((response) => {
          const status = response.data.success;
          if (status) {
            Object.assign(this.products[this.editIndex], this.editProduct);
          } else {
            this.hasError = true;
            this.errors.push(response.data.message);
          }
          this.showEditForms = false;
        })
        .catch((error) => {
          console.log(error);
          this.hasError = true;
          this.errors.push(error);
          this.showEditForms = false;
        });
    },
  },
  created() {
    this.read();
  },
};
</script>
