<template>
<v-list two-line>
    <template v-for="(match, index) in matches" >
    <v-divider v-if="index !== 0" inset light></v-divider>
    <v-list-item v-bind:key="match.match_id" @click="matchSelected(match)">
        <v-list-tile avatar>
        <v-list-tile-avatar>
            <img v-bind:src="'https://api.opendota.com' + getHero(match.hero_id).icon">
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title v-text="getHero(match.hero_id).localized_name"></v-list-tile-title>
            <v-list-tile-sub-title>{{match.kills + '/' + match.deaths + '/' + match.assists + ' '}}<timeago :since="getDate(match.start_time)"></timeago></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
    </v-list-item>
    </template>
</v-list>  
</template>

<script>
export default {
  props: ['matches'],
  methods: {
    getHero(idHero) {
      return this.$store.state.heroes.find(i => i.id === idHero);
    },
    getDate(seconds) {
      const date = new Date(0);
      date.setUTCSeconds(seconds);
      return date;
    },
    matchSelected(match) {
      this.$store.dispatch('loadMatch', match);
    }
  }
}
</script>

<style>

</style>
