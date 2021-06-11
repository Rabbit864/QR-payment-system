<template>
  <v-tabs>
    <v-tab :to="'/dashboard'">Главная</v-tab>
    <v-tab :to="'/showcase'">Витрина</v-tab>
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tab v-bind="attrs" v-on="{ ...menu }" v-if="isLoggedIn">
          {{ currentUser.name }}
        </v-tab>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="logout">Выход</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-tabs>
</template>

<script>
export default {
  name: 'tabAlignments',
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    isLoggedIn() { return this.$store.getters.isLoggedIn; },
  },
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
};
</script>
