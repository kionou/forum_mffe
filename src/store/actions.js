import axios from '@/lib/axiosConfig.js'
 
 export default{

    async fetchCentreData({ commit }) {
        try {
          const response = await axios.get('/centre');
          const data = response.data; 
          console.log('SET_CENTRE_DATA', data);
          commit('SET_CENTRE_DATA', data);
        } catch (error) {
          console.error('Erreur lors de la récupération des centre :', error);
        }
      },

      async fetchSujetData({ commit }) {
        try {
          const response = await axios.get('/sujet');
          const data = response.data; 
          console.log('SET_SUJET_DATA', data);
          commit('SET_SUJET_DATA', data);
        } catch (error) {
          console.error('Erreur lors de la récupération des sujets :', error);
        }
      },

      async fetchCommentaireData({ commit }) {
        try {
          const response = await axios.get('/commentaire');
          const data = response.data; 
          console.log('SET_COMMENTAIRE_DATA', data);
          commit('SET_COMMENTAIRE_DATA', data);
        } catch (error) {
          console.error('Erreur lors de la récupération des commentaires :', error);
        }
      },







}