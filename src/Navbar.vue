<template>
  <v-toolbar class="blue" light>
      <v-toolbar-title class="hidden-sm-and-down">Dota Party</v-toolbar-title>
      <form @submit.prevent="findPlayer">
        <v-text-field prepend-icon="search" v-model="accountId"  label="Account ID" hide-details single-line light></v-text-field>
      </form>
      <form @submit.prevent="findPlayer">
        <v-text-field prepend-icon="search" v-model="accountId"  label="Match ID" hide-details single-line light></v-text-field>
      </form>
  </v-toolbar>

</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'Navbar',
  methods: {
    ...mapActions(['findPlayer'])
  },
  computed: {
    accountId: {
      get() {
        return this.$store.state.filters.accountId;
      },
      set(value) {
        this.$store.commit('setAccountId', value);
      }
    }
  }
}
</script>

<style>
nav input[type="search"] {
    height: 64px !important;
    margin: 0;
}
</style>
