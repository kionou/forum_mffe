<template>
  <Loading v-if="loading"></Loading>
  <div>
    <div class="cards">
      <div class="noresul" v-if="UsersOptions.length === 0">
        <p>bonjour le monde des vivants</p>
      </div>

      <div v-else class="card" v-for="user in UsersOptions" :key="user.id">
        <img :src="user.image" alt="" />
        <!-- <img src="https://randomuser.me/api/portraits/women/68.jpg" alt=""> -->

        <router-link to="">
          <h4>{{ user.nom }} {{ user.prenom }}</h4>
        </router-link>

        <small>suivie par {{ nbresuivie(user._id) }} personne(s)</small>
        <button @click="HamdleSuivre(user._id)">Suivre</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/other/preloader.vue";
import { mapGetters } from "vuex";
import axios from "@/lib/axiosConfig.js";
export default {
  name: "ForumMffeListeInfluente",
  components: { Loading },
  computed: {
    ...mapGetters(["getUser"]),
  },

  data() {
    return {
      UsersOptions: [],
      loading: true,
      estAbonne: false,
      nbre: [],
    };
  },

  async mounted() {
    await this.fetchUsersOptions();
    console.log("Informations de l'utilisateur :", this.getUser);
  },

  methods: {
    nbresuivie(id) {
      return this.nbre.filter((user) => user.influente_id._id === id).length;
    },

    async fetchUsersOptions() {
      try {
        await this.$store.dispatch("fetchUserData"); // Action spécifique aux bourses
        const options = JSON.parse(JSON.stringify(this.$store.getters["getUsersData"]));
        console.log("Options centre:", options.data);

        await this.$store.dispatch("fetchAbonnerData"); // Action spécifique aux bourses
        const abonnements = JSON.parse(
          JSON.stringify(this.$store.getters["getAbonnerData"])
        ).data;
        this.nbre = abonnements;
        console.log("Options abonner:", abonnements);

        const utilisateurConnecteId = this.getUser.user.id;

        this.UsersOptions = options.data.filter((user) => {
          const estAbonne = abonnements.some(
            (abonnement) =>
              abonnement.lambda_id._id === utilisateurConnecteId &&
              abonnement.influente_id._id === user._id
          );
          return user.statut === "I" && !estAbonne;
        });

        console.log("Influenceurs non abonnés :", this.UsersOptions);
        this.loading = false;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des getCentreData:",
          error.message
        );
      }
    },

    async HamdleSuivre(id) {
      this.loading = true;
      let DataUser = {
        lambda_id: this.getUser.user.id,
        influente_id: id,
      };
      console.log("datauser", DataUser);

      try {
        const response = await axios.post("/abonner", DataUser);

        console.log("response.login", response);
        if (response.data.statut === "success") {
          console.log(response.data);
          this.fetchUsersOptions();
          this.loading = false;
        } else {
          return (this.error = response.data.alert);
        }
      } catch (error) {
        return (this.error = "L'authentification a échoué");
      }
    },
  },
};
</script>

<style lang="css" scoped>
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

@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");

body {
  background-color: #f0f1f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lato", sans-serif;
  min-height: 100vh;
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.2) 100%)
    var(--vert);
  border: 1px solid #ccc;
  border-radius: 3px;
  color: var(--blanc);
  padding: 10px 25px;
  margin-top: 25px;
}

.card button:hover {
  background: var(--blanc);
  border: 1px solid var(--vert);
  color: var(--vert);
}

.suivie,
.suivie:hover {
  background: #ccc !important;
  border: 1px solid #ccc !important;
  color: var(--blanc) !important;
}
</style>
