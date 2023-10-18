<template>
	<div>
	  <div class="cards py-4">
		<div class="noresul" v-if="UsersOptions.length === 0">Aucun abonné</div>
		<div   v-else class="card" v-for="user in UsersOptions" :key="user.id">
		  <img :src="baseUrl + '/' + user.image" alt="">
		  <router-link to="">
			<h4>{{ user.nom }} {{ user.prenom }}</h4>
		  </router-link>
		  <small v-if="user.statut === 'I'">suivi par {{ nbresuivie(user._id) }} personne(s)</small>
		  <button @click="$router.push({ path: `/chat`})" >Message</button>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import axios from '@/lib/axiosConfig.js';
  
  export default {
	name: 'ForumMffeListeInfluente',
	computed: {
	  ...mapGetters(['getUser']),
	},
  
	data() {
	  return {
		UsersOptions: [],
		nbre: [],
		baseUrl: 'http://localhost:5000',
	  };
	},
  
	async mounted() {
	  await this.fetchUsersOptions();
	  console.log('Informations de l\'utilisateur abonner :', this.getUser);
	},
  
	methods: {
	  nbresuivie(id) {
		return this.nbre.filter(user => user.influente_id._id === id).length;
	  },
  
	  async fetchUsersOptions() {
		try {
		  await this.$store.dispatch('fetchUserData');
		  const options = JSON.parse(JSON.stringify(this.$store.getters['getUsersData']));
		  console.log('Options centre:', options.data);
  
		  await this.$store.dispatch('fetchAbonnerData');
		  const abonnements = JSON.parse(JSON.stringify(this.$store.getters['getAbonnerData'])).data;
		  console.log('Options abonner:', abonnements);
		  this.nbre = abonnements
		  const statut = this.getUser.user.statut;
		  const utilisateurConnecteId = this.getUser.user.id;
  
		  if (statut === 'I') {
			console.log('Utilisateur est un influenceur');
			// Utilisateur est un influenceur
			this.UsersOptions = options.data.filter(user => {
			  const estAbonne = abonnements.some(abonnement => abonnement.influente_id._id === utilisateurConnecteId && abonnement.lambda_id._id === user._id);
			  console.log('Influenceur est abonné :', estAbonne);
			  return estAbonne;
			});
		  } else if (statut === 'L') {
			console.log('Utilisateur est un lambda');
			this.UsersOptions = options.data.filter(user => {
			  const estAbonne = abonnements.some(abonnement => abonnement.lambda_id._id === utilisateurConnecteId && abonnement.influente_id._id === user._id);
			  return user.statut === 'I' && estAbonne;
			});
		  }
  
		  console.log('Liste d\'utilisateurs filtrée :', this.UsersOptions);
		  this.loading = false;
		} catch (error) {
		  console.error('Erreur lors de la récupération des options des getCentreData:', error.message);
		}
	  },
	},
  };
  </script>
  


<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
	box-sizing: border-box;
}

body {
	background-color: #F0F1F7;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: 'Lato', sans-serif;
	min-height: 100vh;
}

.noresul {
    border: 1px solid var(--vert);
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    border-radius: 6px;
    font-size: 20px;
  
  }
.cards {
	display: flex;
	align-items: center;
	justify-content: center;
  flex-wrap: wrap;
}

.card {
	background-color: #fff;
	border-radius: 3px;
	padding: 30px;
	margin: 10px;
	text-align: center;
	width: 220px;
	max-width: 100%;
  align-items: center;
}

.card img {
	border-radius: 50%;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	width: 75px;
	height: 75px;

}

.card a {
	margin: 10px 0;
  text-decoration: none;
  color: var(--color-text);
}
.card a:hover {
	
  text-decoration: underline;

}

.card small {
	color: #777;
	display: block;
}

.card button {
	background-color: var(--vert);
	border: 1px solid #ccc;
	border-radius: 3px;
	color: var(--blanc);
	padding: 10px 25px;
	margin-top: 25px;
}

</style>