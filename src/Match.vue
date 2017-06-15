<template>
  <v-flex s12 m12 lg12>

    <v-card horizontal v-if="matchId != null" style="width: 100%">
      <v-card-column>
        <v-card-row class="blue white--text">
          <v-card-text style="height: 76px">
            <div class="display-1">Match {{matchId}}</div>
          </v-card-text>
        </v-card-row>
        <Loadable :isLoading="isLoading">
          <v-card-text>
            <v-card-row>
              <table style="width: 100%">
                <thead>
                  <th>
                    <v-chip class="body-1">
                      Load all
                      <v-icon right @click="loadAll()">check_circle</v-icon>
                    </v-chip>
                  </th>
                  <th v-for="player in match.players">
                    <v-chip class="body-1" >
                      <v-avatar>
                        <img :src="'https://api.opendota.com' + getHero(player.hero_id).icon">
                      </v-avatar>
                      {{ getPersona(player.account_id) || 'unknow'  }}
                      <v-icon v-if="selectedAccountsIds.indexOf(player.account_id) >= 0" @click="removeAccId(player.account_id)" right>check_circle</v-icon>
                      <v-icon v-else-if="player.personaname" @click="addAccId(player.account_id)" right>radio_button_unchecked</v-icon>
                      <v-icon v-else right></v-icon>
                    </v-chip>
                  </th>
                </thead>
                <tbody>
                  <tr v-for="selected in selectedPlayers">
                    <td>
                      <v-chip class="body-1" >
                        <v-avatar>
                          <img :src="'https://api.opendota.com' + getHero(selected.hero_id).icon">
                        </v-avatar>
                        {{ selected.personaname || 'unknow'  }}
                        <v-icon right></v-icon>
                      </v-chip>
                    </td>

                    <td v-for="player in match.players" class="text-xs-center">
                      <Loadable v-if="player.account_id != null && selected.account_id !== player.account_id" :isLoading="matchesBetweenLoading(selected.account_id, player.account_id)">
                        {{ matchesBetween(selected.account_id, player.account_id).length }}
                      </Loadable>
                    </td>
                  </tr>
                </tbody>
              </table>
              </v-layout>
            </v-card-row>
          </v-card-text>
        </Loadable>
        <v-card-row actions>
        <a target="_blank" class="blue--text btn btn--dark btn--flat" :href="'https://www.opendota.com/matches/' + match.match_id">OPENDOTA</a>
        <a target="_blank" class="blue--text btn btn--dark btn--flat" :href="'https://www.dotabuff.com/matches/' + match.match_id">DOTABUFF</a>
      </v-card-row>
      </v-card-column>
      
    </v-card>
    
  </v-flex>
</template>

<script>
import Loadable from './Loadable.vue';
import { mapState } from 'vuex';

export default {
  components: {Loadable},
  methods:{
    getHero(idHero) {
      return this.$store.state.heroes.find(i => i.id === idHero);
    },
    matchesBetween(acc1, acc2) {
      const matches = this.$store.getters.matchesBetween(acc1, acc2)
      return matches ? matches : [];
    },
    matchesBetweenLoading(acc1, acc2) {
      return this.$store.state.crossMatchesLoading[String(acc1) + String(acc2)];
    },
    getPersona(accountId)  {
      return this.$store.getters.getPersona(accountId);
    },
    removeAccId(accountId) {
      this.$store.commit('removeSelectedAccountId', accountId);
    },
    addAccId(accountId) {
      this.$store.dispatch('addSelectedAccountId', accountId);
    },
    loadAll() {
      this.match.players.map(p => p.account_id).forEach(id => {
        if (id)
          this.$store.dispatch('addSelectedAccountId', id);
      })
    }
    
  },
  computed: {
    isLoading() {
      return this.$store.state.selectedMatch.matchLoading;
    },
    selectedPlayers() {
      if (!this.match.players)
        return [];
      return this.match.players.filter(p => this.selectedAccountsIds.indexOf(p.account_id) >= 0 );
    },
    ...mapState({
      matchId: state => state.selectedMatch.matchId,
      match: state => state.selectedMatch.match,
      selectedAccountsIds: 'selectedAccountsIds'
    })
  }
}
</script>

<style>
.chip {
  width: 100%;
}

.chip i {
  margin-right: -12px;
}
</style>
