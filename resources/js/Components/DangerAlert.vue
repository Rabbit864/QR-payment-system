<template>
  <v-alert dense outlined type="error" class="mt-2">
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(error, index) in errors" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ error }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-alert>
</template>

<script>
export default {
  props: {
    errors: Array,
  },
};
</script>
