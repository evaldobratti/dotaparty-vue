<template>
  
  <v-flex m12 lg6>
    <Loadable :isLoading="isLoading">
      <v-card horizontal>
        <v-card-row :img="player.profile.avatarfull" height="200px"></v-card-row>
        <v-card-column>
          <v-card-row class="blue white--text">
            <v-card-text>
              <div class="display-1">{{ player.profile.personaname }}</div>
            </v-card-text>
          </v-card-row>
          <v-card-text>
            <v-card-row>
              <p></p>
            </v-card-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-row actions>
            <a target="_blank" class="blue--text btn btn--dark btn--flat" :href="'https://www.opendota.com/players/' + player.profile.account_id">OPENDOTA</a>
            <a target="_blank" class="blue--text btn btn--dark btn--flat" :href="'https://www.dotabuff.com/players/' + player.profile.account_id">DOTABUFF</a>
            </v-card-row>
        </v-card-column>
      </v-card>
    </Loadable>
  </v-flex>
</template>

<script>
import Loadable from './Loadable.vue';

export default {
  components: {Loadable},
  computed: {
    player() {
      return this.$store.state.player;
    },
    isLoading() {
      return this.$store.state.player.profileLoading;
    }
  }
}
</script>

<style>

</style>
