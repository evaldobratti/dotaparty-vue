<template>
  <div id="app">  
    <div class="row">
    <Navbar></Navbar>
    </div>
    <v-container>
      <v-layout row wrap>
        <Player></Player>
        <PlayerMatches ></PlayerMatches>
      </v-layout>
      <v-layout row wrap>
        <Match></Match>
      </v-layout>
    </v-container>
  </div>  
</template>

<script>
import Navbar from './Navbar.vue';
import Player from './Player.vue';
import PlayerMatches from './PlayerMatches.vue';
import Match from './Match.vue';

export default {
  name: 'app',
  components: { Navbar, Player, PlayerMatches, Match },
  created() {
    this.$store.dispatch('updateHeroes');
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>