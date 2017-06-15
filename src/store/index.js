import Vue from 'vue';
import Vuex from 'vuex';
import queue from './queue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      accountId: '',
      matchId: '',
    },
    player: {
      profileLoading: null,
      profile: {},
      matchesLoading: null,
      matches: []
    },
    selectedMatch: {
      matchLoading: null,
      matchId: null,
      match: {}
    },
    personas: {},
    selectedAccountsIds: [],
    matchesCache: {},
    crossMatches: {},
    crossMatchesLoading: {},
    heroes: []
  },
  mutations: {
    setAccountId(state, accountId) {
      state.filters.accountId = accountId;
    },
    setHeroes(state, heroes) {
      state.heroes = heroes;
    },
    setPlayer(state, player) {
      state.player.profile = player;
      state.player.profileLoading = false;
      state.selectedAccountsIds.push(player.account_id);
    },
    setPlayerLoading(state) {
      state.player.profileLoading = true;
      state.player.matchesLoading = true;
      state.player.matches = [];
    },
    setPlayerMatchesLoading(state) {
      state.player.matchesLoading = true;
    },
    setPlayerMatches(state, matches){
      state.player.matches = matches;
      state.player.matchesLoading = false;
    },
    setSelectedMatchLoading(state, match) {
      state.selectedMatch.matchId = match.match_id;
      state.selectedMatch.matchLoading = true;
    },
    setSelectedMatch(state, match) {
      state.selectedMatch.matchLoading = false;
      state.selectedMatch.match = match;
      state.selectedMatch.matchId = match.match_id;
      state.selectedAccountsIds = state.selectedAccountsIds.filter(p => match.players.map(p => p.account_id).indexOf(p) >= 0 );
      Vue.set(state.matchesCache, match.match_id, match);
      match.players.map(p => {
        Vue.set(state.personas, p.account_id, p.personaname);
      });
      
    },
    setCrossMatchesLoading(state, { acc1, acc2 }) {
      Vue.set(state.crossMatchesLoading, String(acc1) + String(acc2), true);
      Vue.set(state.crossMatchesLoading, String(acc2) + String(acc1), true);
    },
    setCrossMatches(state, { acc1, acc2, matches }) {
      Vue.set(state.crossMatches, String(acc1) + String(acc2), matches);
      Vue.set(state.crossMatches, String(acc2) + String(acc1), matches);

      Vue.set(state.crossMatchesLoading, String(acc1) + String(acc2), false);
      Vue.set(state.crossMatchesLoading, String(acc2) + String(acc1), false);
    },
    removeSelectedAccountId(state, accountId) {
      state.selectedAccountsIds.splice(state.selectedAccountsIds.indexOf(accountId), 1);
    },
    addSelectedAccountId(state, accountId) {
      if (state.selectedAccountsIds.indexOf(accountId) < 0)
        state.selectedAccountsIds.push(accountId);
    }
  },
  getters: {
    matchesBetween(state) {
      return (acc1, acc2) => state.crossMatches[String(acc1) + String(acc2)];
    },
    getPersona(state) {
      return accountId => state.personas[accountId];
    }
  },
  actions: {
    updateHeroes({ commit }) {
      queue.get('https://api.opendota.com/api/heroStats', response => {
        commit('setHeroes', response.data);
      });
    },
    findPlayer({ commit, state, dispatch }) {
      commit('setPlayerLoading');
      queue.get('https://api.opendota.com/api/players/' + state.filters.accountId + "/", (res) => {
        commit('setPlayer', res.data.profile)  ;
        dispatch('getPlayerMatches');
      })
    },
    getPlayerMatches({ commit, state }) {
      commit('setPlayerMatchesLoading');

      queue.get('https://api.opendota.com/api/players/' + state.player.profile.account_id + "/matches?limit=50", (response) => {
        commit('setPlayerMatches', response.data);
      });
    },
    loadMatch({commit, state, dispatch }, match) {
      if (match.match_id in state.matchesCache) {
        commit('setSelectedMatch', state.matchesCache[match.match_id]);
        return;
      }

      commit('setSelectedMatchLoading', match);
      queue.get('https://api.opendota.com/api/matches/' + match.match_id, (res) => {
        commit('setSelectedMatch', res.data);
        dispatch('loadCrossMatches');
      });
    },
    loadCrossMatches({commit, state, getters }) {
      state.selectedAccountsIds.forEach(acc1 => {
        state.selectedMatch.match.players.map(p => p.account_id).filter(p => p != null).forEach(acc2 => {
          if (state.crossMatchesLoading[String(acc1) + String(acc2)] != null)
            return;
          
          if (acc1 === acc2)
            return;
          
          commit('setCrossMatchesLoading', {acc1, acc2});
          queue.get("https://api.opendota.com/api/players/" + acc1 + "/matches?included_account_id=" + acc2, res => {
            commit('setCrossMatches', { acc1, acc2, matches: res.data });
          });
        });
      })
    },
    addSelectedAccountId({state, commit, dispatch }, accountId) {
      if (state.selectedAccountsIds.indexOf(accountId) >= 0)
        return;

      commit('addSelectedAccountId', accountId);
      dispatch('loadCrossMatches');
    }
  }
});