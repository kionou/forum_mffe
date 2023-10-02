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

      async fetchUserData({ commit }) {
        try {
          const response = await axios.get('/users/all-users');
          const data = response.data; 
          console.log('SET_USERS_DATA', data);
          commit('SET_USERS_DATA', data);
        } catch (error) {
          console.error('Erreur lors de la récupération des users :', error);
        }
      },  
      
      async fetchAbonnerData({ commit }) {
        try {
          const response = await axios.get('/abonner');
          const data = response.data; 
          console.log('SET_ABONNER_DATA', data);
          commit('SET_ABONNER_DATA', data);
        } catch (error) {
          console.error('Erreur lors de la récupération des abonner :', error);
        }
      },
      async fetchMessageData({ commit }) {
        try {
          const response = await axios.get('/chat');
          const data = response.data; 
          console.log('SET_MESSAGE_DATA', data);
          commit('SET_MESSAGE_DATA', data);
        } catch (error) {
          console.error('Erreur lors de la récupération des message :', error);
        }
      },


}