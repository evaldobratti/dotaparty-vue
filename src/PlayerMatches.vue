<template>
  
  <v-flex m12 lg6>
    <Loadable :isLoading="isLoading">
      <v-card horizontal>
        <v-card-column>
          <v-card-row class="blue white--text">
            <v-card-text style="height: 76px">
              <div class="display-1">Matches</div>
            </v-card-text>
          </v-card-row>
          <v-card-text>
            <v-card-row>
              
              <v-card-column>
                <MatchesList :matches="matches.slice(0, 4)"></MatchesList>
              </v-card-column>
              <v-card-column>
                <MatchesList :matches="matches.slice(4, 8)"></MatchesList>
              </v-card-column>
              <v-card-column>
                <MatchesList :matches="matches.slice(8, 12)"></MatchesList>
              </v-card-column>
              
              </v-layout>
            </v-card-row>
          </v-card-text>
          <v-divider></v-divider>
        </v-card-column>
      </v-card>

      
    </Loadable>
  </v-flex>  
</template>

<script>
import Loadable from './Loadable.vue';
import MatchesList from './MatchesList.vue'

export default {
  components: { Loadable, MatchesList },
  data() {
    return {
      headers: [
        { text: 'Hero', value: 'hero' },
        { text: 'K/D/A', value: 'kda' },
      ]
    }
  },
  computed: {
    matches() {
      return this.$store.state.player.matches;
    },
    isLoading() {
      return this.$store.state.player.matchesLoading;
    }
  }
}
</script>

<style>
.avatar img {
  height: 32px;
  width: 32px;
  border-radius: 0%;
}

.list--two-line .list__tile {
  height: auto;
}

time {
  float: right;
}
</style>
