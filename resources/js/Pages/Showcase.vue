<template>
  <div class="container">
    <nav-bar-menu></nav-bar-menu>
    <danger-alert v-if="hasError" :errors="errors"></danger-alert>
    <product-table
      :products="products"
      :editItem="editItem"
      :deleteProduct="deleteProduct"
    ></product-table>
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
import NavBarMenu from '../Components/NavbarMenu.vue';
import ProductTable from '../Components/ProductTableAction.vue';
import DangerAlert from '../Components/DangerAlert.vue';
/* global axios  */
export default {
  components: { NavBarMenu, ProductTable, DangerAlert },
  data() {
    return {
      products: [],
      showEditForms: false,
      editProduct: {
        name: '',
        cost: 0,
        count: 0,
        description: '',
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
        .catch((error) => {
          console.log(error);
          this.hasError = true;
          this.errors.push(error);
        });
    },
    editItem(product) {
      this.editIndex = this.products.indexOf(product);
      this.editProduct = { ...product };
      this.showEditForms = true;
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
