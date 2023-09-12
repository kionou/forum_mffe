<template>
      <Loading v-if="loading"></Loading>
    <div>
        <div class="auth-container my5">
            <div class="icone ">
                <i class="bi bi-person-gear"></i>
                <span> Mes informations</span>
            </div>

            <form  class="auth-form fade fade-1 in mt-3">

                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Nom </label>
                        <input type="text" id="registration_form_username"
                        name="nom"  class="form-control" v-model="step1.nom">
                        <small v-if="v$.step1.nom.$error">{{ v$.step1.nom.$errors[0].$message }}</small> 
                    </div>

                    </div>
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Prenoms</label>
                        <input type="text" id="prenom"
                        name="prenom" required="required" class="form-control" v-model="step1.prenom">
                        <small v-if="v$.step1.prenom.$error">{{ v$.step1.prenom.$errors[0].$message }}</small> 
                    </div>

                    </div>
                </div>
                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_email" class="required">Adresse email</label><input type="email"
                        id="registration_form_email" name="email" 
                        class="form-control" v-model="step1.email">
                        <small v-if="v$.step1.email.$error">{{ v$.step1.email.$errors[0].$message }}</small> 
                </div>

                    </div>
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Nom d'utilisateur</label>
                        <input type="text" id="registration_form_username"
                        name="pseudo" class="form-control" v-model="step1.pseudo">
                        <small v-if="v$.step1.pseudo.$error">{{ v$.step1.pseudo.$errors[0].$message }}</small> 
                    </div>

                    </div>
                </div>

                <div class="row mb-3 mt-3 content-group">
                    <div class="col">
                        <div class="form-group">
                    <label for="registration_form_username" class="required">Numéro Téléphonique </label>
                        <input type="tel" id="password"
                        name="numero"  class="form-control" v-model="step1.numero">
                        <small v-if="v$.step1.numero.$error">{{ v$.step1.numero.$errors[0].$message }}</small> 
                    </div>

                    </div>
                  
                </div>

                <button type="submit" @click.prevent="editer" class="btn-gradient">Editer</button>

            </form>
            <div class="icone mt-10">
                <i class="bi bi-lock"></i>
                <span>Mot de passe</span>
            </div>



    <form  class="auth-form fade fade-1 in mt-3 ">
        <small>{{ error }}</small>

<div class="row mb-3 mt-3 content-group">
    <div class="col">
        <div class="form-group">
    <label for="registration_form_username" class="required">Actuel </label>
        <input type="password" id="registration_form_username"
        name="password"  class="form-control" v-model="step2.actuel">
        <small v-if="v$.step2.actuel.$error">{{ v$.step2.actuel.$errors[0].$message }}</small> 

    </div>

    </div>
    <div class="col">
        <div class="form-group">
    <label for="registration_form_username" class="required">Nouveau</label>
        <input type="password" id="prenom"
        name="password" required="required" class="form-control"  v-model="step2.new">
        <small v-if="v$.step2.new.$error">{{ v$.step2.new.$errors[0].$message }}</small> 

    </div>

    </div>
    <div class="col">
        <div class="form-group">
    <label for="registration_form_username" class="required">Confirmer</label>
        <input type="password" id="prenom"
        name="password" required="required" class="form-control"   v-model="step2.confirmer">
        <small v-if="v$.step2.confirmer.$error">{{ v$.step2.confirmer.$errors[0].$message }}</small> 
        <small v-if="!validatePasswordsMatch()" >Les mots de passe ne correspondent pas.</small>

    </div>

    </div>
</div>


<button type="submit" @click.prevent="hamdlepassword"   class="btn-gradient">Modifier</button>

</form>

        </div>
    </div>
    <MazDialog v-model="msgsuccessupdate" >
        <p>
         Modification enregistré avec success !!!
        </p>
        <template #footer="{ close }">
  
          <div class="supp" @click="close" style="background-color: blue; "> Ok</div>
  
        </template>
      </MazDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax, ValidEmail , ValidNumeri } from '@/functions/rules';
import { mapGetters } from 'vuex';
import axios from '@/lib/axiosConfig.js';
import Loading from '../../other/preloader.vue';
import MazDialog from 'maz-ui/components/MazDialog'
export default {
    name: 'ForumMffeInscription',
    components:{  Loading , MazDialog} ,
    props:['data'],
    computed: {
      ...mapGetters(['getUser']),
  },
    watch: {
  data(newData) {
    // Effectuez les actions nécessaires lorsque data est mis à jour
    console.log('Données mises à jour dans le composant enfant :', newData);
      this.step1.nom = newData.nom;
      this.step1.prenom = newData.prenom;
      this.step1.email = newData.email;
      this.step1.pseudo = newData.pseudo;
      this.step1.numero = newData.numero;
  }
},

    data() {
        return {
            v$:useVuelidate(),
            loading:false, 
            msgsuccessupdate:false,
            step1:{
            nom:'',
            prenom:'',
            email:'',
            pseudo:'',
            numero:'',
            },

            step2:{
            actuel:'',
            new:'',
            confirmer:'',
            
            },
            error:''

        };
    },
    validations: {
        step1:{
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
        },
        step2:{
        
            actuel: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    },
    new: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    },

    confirmer: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    },
        }
  
    
 
  },

    mounted() {
        console.log( this.data.nom);
        console.log('Informations de l\'utilisateur :', this.getUser);
        // if (this.data) {
      // Assurez-vous que 'this.data' est défini avant d'accéder aux données
      this.step1.nom = this.data.nom;
      this.step1.prenom = this.data.prenom;
      this.step1.email = this.data.email;
      this.step1.pseudo = this.data.pseudo;
      this.step1.numero = this.data.numero;

      // Vous pouvez également initialiser les champs du formulaire de la deuxième étape si nécessaire
    // }

    },

    methods: {
        validatePasswordsMatch() {
      return this.step2.new === this.step2.confirmer;
    },
        async editer() {
       
       this.v$.step1.$touch()
       this.error = ''
       if (this.v$.$errors.length == 0 ) {
        this.loading = true

        let DataUser = {
            nom: this.step1.nom ,
            prenom:this.step1.prenom,
            email:this.step1.email,
            pseudo:this.step1.pseudo,
            numero:this.step1.numero
        }
            console.log('user',DataUser , this.data._id );
            try {
         const response = await axios.put(`/users/${ this.data._id}`, DataUser ,{
          headers: {
            Authorization: `Bearer ${this.getUser.token}`,
           
          }
        });;
         console.log('response.sousprefecture', response);
         if (response.data.statut === 'success') {
             this.msgsuccessupdate = true
            this.loading = false
         } else {
            
         }
         
       } catch (error) {
         console.error('Erreur post:', error);
         console.log("eee",error);
         this.loading = false
       }
  
       }else{
    
        console.log('pas bon' , this.v$.$errors );
    
    }
    },

  async  hamdlepassword(){
    
        this.v$.step2.$touch()
       this.error = ''
       if (this.v$.$errors.length == 0 ) {
        this.loading = true

        let DataUser = {
            password: this.step2.actuel ,
            new_password:this.step2.new,
           
        }

        console.log('pass',DataUser);
        try {
         const response = await axios.put(`/users/${ this.data._id}`, DataUser ,{
          headers: {
            Authorization: `Bearer ${this.getUser.token}`,
           
          }
        });;
         console.log('response.sousprefecture', response);
         if (response.data.alert) {
            this.loading = false
            return this.error = response.data.alert
         } else {
            this.loading = false
            this.msgsuccessupdate = true
         }
         
       } catch (error) {
         console.error('Erreur post:', error);
         console.log("eee",error.response.data.alert);
         return this.error = "Ce nom d'utilisateur existe déjà! "
       }
    }
    
    }
},
};
</script>

<style lang="css" scoped>

.supp {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 45px;
  z-index: 3;
  cursor: pointer;
  outline: none;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
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
    max-width: 790px;
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
.icone{
    width: 100%;
    font-weight: bolder;
    font-size: 22px;
    font-family: system-ui;
    display: flex;
    align-items: center;
    justify-content: center;

}

</style>