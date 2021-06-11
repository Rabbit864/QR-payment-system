<template>
  <v-dialog persistent max-width="600px">
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
              <v-text-field v-model="editProduct.description" label="Описание">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Закрыть
        </v-btn>
        <v-btn color="blue darken-1" text @click="updateProduct">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    editProduct: Object,
    close: Function,
    updateProduct: Function,
  },
};
</script>
