<template>
  <v-tabs>
    <v-tab :to="'/dashboard'">Главная</v-tab>
    <v-tab :to="'/showcase'">Витрина</v-tab>
    <v-tab> {{ currentUser.name }} </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "tabAlignments",
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
};
</script>

