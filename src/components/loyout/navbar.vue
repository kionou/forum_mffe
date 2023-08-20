<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <router-link class="navbar-brand fw-bold" to="/">e-femme</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        
      </ul>
      <!-- <button class="btn btn-outline-dark fw-bold" type="submit">Contact Us</button> -->
      <router-link to="/connexion" class="btnCt" >
          <i class=" bi bi-person-fill-lock"></i>
          <span> Connexion </span>
        </router-link>
    </div>
  </div>
</nav>

    </div>
</template>

<script>
export default {
    name: 'ForumMffeNavbar',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>

.navbar {
  background: var(--blanc);
  box-shadow: var(--box-shadow);
}
.navbar .navbar-nav .nav-link {
  color: var( --titre-color);
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
    justify-content: space-around

}
.btnCt:hover{
color: var( --vert);
border: 1px solid var(--vert);
}


</style>