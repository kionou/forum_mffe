<template>
    <Loading v-if="loading"></Loading>
    <div>
        <div class="auth-container my5">


            <h1 class="auth-title fade in">
                S'inscrire
            </h1>
            <small>{{error}}</small>  
            <form name="registration_form" method="post" class="auth-form fade fade-1 in">

                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                        <label for="registration_form_username" class="required">Nom </label>
                        <input type="text" id="registration_form_username" name="nom"  class="form-control" v-model="nom">
                        </div>
                        <small v-if="v$.nom.$error">{{ v$.nom.$errors[0].$message }}</small>
                    </div>
                    <div class="col">
                        <div class="form-group">
                         <label for="registration_form_username" class="required">Prenoms</label>
                        <input type="text" id="prenom"
                        name="prenom" required="required" class="form-control" v-model="prenom">
                        <small v-if="v$.prenom.$error">{{ v$.prenom.$errors[0].$message }}</small>  
                    </div>

                    </div>
                </div>
                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_email" class="required">Adresse email</label>
                    <input type="email" id="registration_form_email" name="email"  class="form-control" v-model="email">
                    <small v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>  
                </div>

                    </div>
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Nom d'utilisateur</label>
                        <input type="text" id="registration_form_username"
                        name="pseudo" class="form-control" v-model="pseudo">
                        <small v-if="v$.pseudo.$error">{{ v$.pseudo.$errors[0].$message }}</small>  

                    </div>

                    </div>
                </div>

                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Numéro Téléphonique </label>
                        <input type="tel" id="password"
                        name="numero"  class="form-control" v-model="numero">
                        <small v-if="v$.numero.$error">{{ v$.numero.$errors[0].$message }}</small>  

                    </div>

                    </div>
                  
                </div>

                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Mot de passe </label>
                        <input type="password" id="password"
                        name="nom"  class="form-control" v-model="password">
                        <small v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</small>  

                    </div>

                    </div>
                    <div class="col">
                        <div class="form-group"><label for="registration_form_plainPassword_second" class="required">Confirmer le
                        mot de passe</label>
                        <input type="password" id="registration_form_plainPassword_second"
                        name="password" 
                        class="form-control" v-model="confirmer_password">
                        <small v-if="v$.confirmer_password.$error">{{ v$.confirmer_password.$errors[0].$message }}</small>  
                        <small v-if="!validatePasswordsMatch()" >Les mots de passe ne correspondent pas.</small>

                    </div>


                    </div>
                </div>

                <button type="submit" @click.prevent="submit" class="btn-gradient">S'inscrire</button>

            </form>

        </div>
        
    <MazDialog v-if="isOpen" v-model="isOpen" width="auto" noClose>
        <div class="form-container">
	<p class="title">
    <img src="@/assets/image/success.png" alt="">
  </p>
    <p class="text-center mb-3"> 
      Félicitations ! Votre compte a été créé avec succès. Veuillez vous connecter pour commencer
       à utiliser notre plateforme. Bienvenue parmi nous !
      
    </p>
	
		<button class="btn-gradient" @click="redirect">Se connecter</button>
    </div> 

    </MazDialog>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax, ValidEmail , ValidNumeri } from '@/functions/rules';
import axios from '@/lib/axiosConfig.js'
import MazDialog from 'maz-ui/components/MazDialog'
import Loading from '../../components/other/preloader.vue';
export default {
    name: 'ForumMffeInscription',
    components:{MazDialog , Loading},

    data() {
        return {
            v$:useVuelidate(), 
            isOpen:false,
            loading:false,
        nom: '',
      prenom: '',
        email: '',
        pseudo:'',
        numero:'',
      password: '',
      confirmer_password: '',
      error:'',
        };
    },
     
  validations: {
    nom: {
      require, 
      lgmin: lgmin(2),
      lgmax: lgmax(20),  
    },
    prenom: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    email: {
      require,
      ValidEmail
    
    },
    pseudo: {
      require,
      lgmin: lgmin(3),
    },
    numero: {
      require,
      ValidNumeri,
      lgmin: lgmin(10),
      lgmax: lgmax(10),
    },
    password: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    },
    confirmer_password: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    },
 
  },

    mounted() {

    },

    methods: {
        validatePasswordsMatch() {
      return this.password === this.confirmer_password;
    },
    redirect(){
        this.isOpen = false
        this.$router.push('/connexion');
    },
    async submit() {
       
       this.v$.$touch()
       this.error = ''
       if (this.v$.$errors.length == 0 ) {
        this.loading = true
         let DataUser = {
         nom: this.nom,
         prenom: this.prenom,
         email: this.email,
         pseudo:this.pseudo,
         numero:this.numero,
         password: this.password,
         statut:'L'
                 
       }
       console.log('eeedata', DataUser);
       try {
         const response = await axios.post('/users/sign-in-user', DataUser);
         console.log('response.sousprefecture', response);
         if (response.data.statut === 'success') {
            this.loading = false
            this.isOpen = true
         } else {
            this.loading = false
            return this.error = "L'adresse e-mail existe déjà dans notre système. Veuillez vous connecter avec cette adresse."
         }
         
       } catch (error) {
         console.error('Erreur post:', error);
         console.log("eee",error.response.data.alert);
         this.loading = false
         return this.error = "Ce nom d'utilisateur existe déjà! "
       }

       
}else{
 console.log('pas bon' , this.v$.$errors );

}
   },
    },
};
</script>

<style lang="css" scoped>

.form-container {
  width: 510px;
  border-radius: 0.75rem;
  color: black;
  z-index: 100;

}
.title {
  display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.title img{
  width: 90px;
  height: ç0px;

}


small {
  color: #f8001b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-container {
    width: 100%;


    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
}

.fade.in {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: .7s cubic-bezier(.5, 0, 0, 1);
}

.auth-title {
    color: var(--vert);
    text-align: center;
    margin-bottom: calc(4 * 8px);
    font-size: 52px;
    font-family: Inter, sans-serif;
    font-weight: 700;
    line-height: 1.2;
}

.fade {
    opacity: 0 !important;
    transform: translateY(30px) !important;
}


.auth-form {
    padding: calc(3 * 8px);
}

.alert,
.auth-form,
.blog-post__image img,
.card,
.card--stacked::after,
.card--stacked::before,
.chapters-split>*,
.course,
.cursus-card,
.dropdown ul,
.forum-report__form,
.home-post__image img,
.notifications,
.pagination a,
.podcast-suggestion__vote,
.requirements,
.search-header .search-input_suggestions,
.tree-item {
    background: var(--blanc);
    border: 1px solid #d5e3ec;
    box-shadow: 0 2px 4px var(--box-shadow);
    border-radius: 3px;
    transition: .3s;
    max-width: 600px;
    width: 100%;
}

.fade-1 {
    transition-delay: .2s !important;
}

.form-group label {
    display: block;
    margin-bottom: calc(1 * 8px);
}

label {
    text-transform: uppercase;
    font-weight: 300;
    font-size: .85em;
}

a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

.form-group input,
.form-group select,
.form-group textarea,
.ts-dropdown .dropdown-input,
.ts-input {
    border: 1px solid #d5e3ec;
    background: #f7fafb;
    border-radius: 3px;
    color: var(--color);
    padding: calc(1.5 * 8px) calc(1 * 8px);
    display: block;
    width: 100%;
    outline: 0;
    min-height: 48px;
}

.form-check input:focus+label::before,
.form-group input:focus,
.ts-input.focus,
form button:focus,
input:focus+label .switch,
select:focus,
textarea:focus {
    border-color: var(--vert);
    box-shadow: 0 0 0 3px var(--contrast25);
}

input,
select {
    font-size: inherit;
    font-family: inherit;
}

.auth-actions {
    font-size: .9rem;
}
.col{
    padding:0 10px;
    
    }
.flex {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
}

.btn-gradient {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .2) 100%) var(--vert);
}

.auth-form>*+* {
    margin-top: calc(3 * 8px);
}

.btn-danger,
.btn-discord,
.btn-gradient,
.btn-primary,
.btn-primary-outlined,
.btn-secondary,
.btn-social,
.btn-white-outlined {
    text-decoration: none !important;
    padding: 9px 16px;
    border: none;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(36, 57, 141, .4);
    border-radius: 4px;
    line-height: 1.6;
    font-family: Inter, sans-serif;
    font-weight: 700;
    color: var(--blanc);
    cursor: pointer;
    transition: filter .3s, background .3s, color .3s;
    font-size: .9em;
    filter: brightness(1);
    white-space: nowrap;
}

@media (max-width: 768px) {

    .auth-title {
        font-size: 40px;
    }
  

    .content-group {
    display: flex;
    flex-direction: column;
  }
}
</style>