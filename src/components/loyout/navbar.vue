<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <router-link class="navbar-brand fw-bold" to="/">e-femme</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0" v-if="getUser && getUser.user.statut === 'M'">
        <li class="nav-item">
          <router-link to="/moderatrice"  class="nav-link">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/moderatrice/sujet/accepter"  class="nav-link">Sujet Postuler</router-link>
        </li >
        <li class="nav-item">
          <router-link to="/moderatrice/sujet/rejeter"  class="nav-link">Sujet Rejeter</router-link>
        </li>
        
      </ul>
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0" v-else>
        <li class="nav-item">
          <router-link to="/forum"  class="nav-link">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/liste_influente"  class="nav-link">Liste</router-link>
        </li >
        <li class="nav-item">
          <router-link to="/sujet"  class="nav-link">Sujet</router-link>
        </li>
        
      </ul>
      <div  v-if="getUser" >
          <div class="btnCt "  role="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 130px;">
        <i class="bi bi-person-fill"></i>
          <span v-if="getUser.user.statut === 'M'"> Moderateur</span>
          <span v-else-if="getUser.user.statut === 'L'"> Lambda</span>
          <span v-else-if="getUser.user.statut === 'I'"> Influent</span>

          
       </div>
                <ul class="dropdown-menu menu"  >
             <!-- <li><router-link to="/mon_espace"  class="dropdown-item d-flex justify-content-around" ><i class="bi bi-postcard pt-0"></i>Mon espace</router-link></li> -->
             <li><router-link to="/profil"  class="dropdown-item d-flex justify-content-around" ><i class="bi bi-postcard pt-0"></i>Mon profil</router-link></li>            
             <li><span class="dropdown-item d-flex justify-content-around " style="cursor:pointer;" @click="logout" ><i class="bi bi-box-arrow-in-right pt-0"></i>Déconnexion</span></li>
             
           </ul>
               </div>
               <div  v-else style="display: flex;">
                <router-link to="/connexion" class="btnCt"  >
          <i class=" bi bi-person-fill-lock"></i>
          <span> Connexion </span>
        </router-link>
        <router-link to="/inscription" class="btnCt"  >
          <i class=" bi bi-person-fill-lock"></i>
          <span> Inscription </span>
        </router-link>
               </div>
         
    </div>
  </div>
</nav>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ForumMffeNavbar',
    computed: {
  ...mapGetters(['getUser']),
},

    data() {
        return {
            
        };
    },

    mounted() {
      console.log('navbar',this.getUser);
        
    },

    methods: {
      ...mapActions({  logoutUser: 'logoutUser', }),
    logout() {
      this.logoutUser(); // Appeler la méthode de déconnexion lors du clic sur le bouton de déconnexion
      this.$router.push('/connexion');
    },
    },
};
</script>

<style lang="css" scoped>

.navbar {
  background: var(--blanc);
  border-bottom: 1px solid #d5e3ec;
}
.navbar .navbar-nav .nav-link {
  color: var( --titre-color);
  font-size: 15px;
    font-weight: 500;
}
.btn-outline-dark {
  border-radius: 0;
}
.btn-outline-dark:focus {
  box-shadow: none;
}
@media screen and (max-width: 768px) {
  .btn-outline-dark {
    border: none;
    padding: 0;
    outline: none;
  }

  .btn-outline-dark:hover {
    background: none;
    color: gray;
  }
}

.btnCt{
    padding: 8px;
    font-size: 15px;
    font-weight: 500;
    color: var( --titre-color);
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    align-content: center;
    text-decoration: none;
    border: 1px solid var( --titre-color);
    width: 120px;
    justify-content: space-around;
    margin: 10px;

}
.btnCt:hover{
color: var( --vert);
border: 1px solid var(--vert);
}


.dropdown-menu.show {
    display: block;
    right: 16px;
    left: auto !important;
}


</style>