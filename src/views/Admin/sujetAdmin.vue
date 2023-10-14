<template>
    <div class="container">
       <p>Utilisateurs</p>
     
       <div class="content">
        <div class="search-box">
  <input class="search-input" type="text" placeholder="Search something..">
  <button class="search-btn"   ><i class='bx bx-search'></i></button>
</div>
        <div class="icon" @click="this.isOpen =true">
            <i class='bx bxs-user-plus'></i>
        </div>
       </div>
    </div>
    <div class="general1" role="tablist">
  <div class="info-item d-flex justify-content-center align-items-center nav-link  active " role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-home1" aria-controls="navs-pills-top-home1" aria-selected="true" >
                <i class="bi bi-people me-2"></i>
                <div>
                  <p>Lambda</p>
                </div>
              </div>
              <div class="info-item d-flex justify-content-center align-items-center nav-link "    role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-profile1" aria-controls="navs-pills-top-profile1" aria-selected="false" >
                <i class="bi bi-people me-2"></i>
                <div>
                  <p>Influents</p>
                </div>
              </div>
              <div class="info-item d-flex justify-content-center align-items-center nav-link " role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-messages1" aria-controls="navs-pills-top-messages1" aria-selected="false" >
                <i class="bi bi-people me-2"></i>
                <div>
                  <p>Moderateurs</p>
                </div>
              </div>
</div>
<div class="tab-pane fade show active  contenu" id="navs-pills-top-home1" role="tabpanel" >
  <Lambda/>

</div>
      <div class="tab-pane fade" id="navs-pills-top-profile1" role="tabpanel">
        
        <Influent/>
      </div>

      <div class="tab-pane fade" id="navs-pills-top-messages1" role="tabpanel">
        

     <Moderateur/>

      </div>

      <MazDialog v-if="isOpen" v-model="isOpen" width="621px" title="Enregistrement"  >
        <div class="containe">
        <form >
            <div class="user_details">
                <div class="input_pox">
                    <span class="datails">Nom</span>
                    <input type="text" placeholder="Nom" name="nom" v-model="nom">
                    <small v-if="v$.nom.$error">{{ v$.nom.$errors[0].$message }}</small>
                </div>
                <div class="input_pox">
                    <span class="datails">Prenoms</span>
                    <input type="text" placeholder="Prenoms" name="prenom" v-model="prenom">
                    <small v-if="v$.prenom.$error">{{ v$.prenom.$errors[0].$message }}</small>  

                </div>
                <div class="input_pox">
                    <span class="datails">Adresse Email</span>
                    <input type="email" placeholder="Adresse Email" name="email" v-model="email">
                    <small v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>  

                </div>
                <div class="input_pox">
                    <span class="datails">Numéro Téléphonique</span>
                    <input type="tel" placeholder="Numéro Téléphonique" name="numero" v-model="numero">
                    <small v-if="v$.numero.$error">{{ v$.numero.$errors[0].$message }}</small>  

                </div>
                <div class="input_pox">
                    <span class="datails">Nom d'utilisateur</span>
                    <input type="text" placeholder="Nom d'utilisateur" name="pseudo" v-model="pseudo">
                    <small v-if="v$.pseudo.$error">{{ v$.pseudo.$errors[0].$message }}</small>  
                </div>
                <div class="input_pox">
                    <span class="datails">Role</span>
                <select class="form-select" aria-label="Default select example" name="genre" v-model="statut">
              <option disabled selected >Choisissez une option</option>
              <option value="I">Influente</option>
              <option value="M">Moderatrice</option>
             
              </select>
              <small v-if="v$.statut.$error">{{ v$.statut.$errors[0].$message }}</small>  

                </div>
            </div>
            <div  class="button">
              <div  @click="submit" class="sign">Register</div>
            <!-- <input  class="sign" @click="submit" value="Register"> -->

                
            </div>
        </form>
    </div>
  </MazDialog>

  <MazDialog v-if="msgsuccess" v-model="msgsuccess" width="auto" noClose>
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
</template>

<script>
import MazDialog from 'maz-ui/components/MazDialog'
import Influent from '../../components/Admin/user/influente.vue';
import Moderateur from '../../components/Admin/user/moderatrice.vue';
import Lambda from '../../components/Admin/user/lambda.vue';
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax, ValidEmail , ValidNumeri } from '@/functions/rules';
import axios from '@/lib/axiosConfig.js'
export default {
    name: 'CpHeader',
    components: {
    MazDialog, Lambda , Moderateur , Influent
    
  },

    data() {
        return {
            isOpen:false,
            msgsuccess:false,
            v$:useVuelidate(), 
           
        nom: '',
      prenom: '',
        email: '',
        pseudo:'',
        numero:'',
      statut: '',
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
    statut: {
      require,
    },
   
 
  },

    mounted() {
        
    },

    methods: {
      async submit() {
        console.log('eeedata', 'DataUser');
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
         statut:this.statut
                 
       }
       console.log('eeedata', DataUser);
        this.msgsuccess = true
      //  try {
      //    const response = await axios.post('/users/sign-in-user', DataUser);
      //    console.log('response.sousprefecture', response);
      //    if (response.data.statut === 'success') {
      //       this.loading = false
      //       this.msgsuccess = true
      //    } else {
      //       this.loading = false
      //       return this.error = "L'adresse e-mail existe déjà dans notre système. Veuillez vous connecter avec cette adresse."
      //    }
         
      //  } catch (error) {
      //    console.error('Erreur post:', error);
      //    console.log("eee",error.response.data.alert);
      //    this.loading = false
      //    return this.error = "Ce nom d'utilisateur existe déjà! "
      //  }

       
}else{
 console.log('pas bon' , this.v$.$errors );

}
   },
        
    },
};
</script>

<style lang="css" scoped>
.container{
/* border: 1Px solid red; */
background-color:var(--blanc);
border-radius: var(--raduis);
width: 100%;
height: 60px;
display: flex;
display: flex;
justify-content: space-between;
align-items: center;
padding:10px;
position: relative;

}
.container p{
    font-weight: 900;


}

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
.container .content{
    /* border:1px solid blue; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

}
.search-box {
  width: 350px;
  position: relative;
  display: flex;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

.search-input {
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 5px 45px 5px 15px;
 border: 1px solid var(--vert);
    color: var(--noir);
    border-radius: 6px;
    transition: all .4s;
}

.search-input:focus {
  border:none;
  outline:none;
  box-shadow: var(--box-shadow);
}

.search-btn {
  background-color: transparent;
  font-size: 18px;
  padding: 6px 9px;
  margin-left:-45px;
  border:none;
  color: #6c6c6c;
  transition: all .4s;
  z-index: 10;
  display: flex;
}

.search-btn:hover {
  transform: scale(1.2);
  cursor: pointer;
  color:var(--vert);
}

.search-btn:focus {
  outline:none;
  color:black;
}

/* You just need to get this field - end */

.footer {
  position:fixed;
  bottom:5px;
}

.footer p {
  font-family: 'Montserrat', sans-serif;
  font-size:12px;
  color:#000;
}

.footer a {
  color: #fff;
  transition: all .4s;
}

.footer a:hover {
  color: #eaeaeb;
}

.container .content .icon{
    /* border: 1px solid red; */
    width: 35px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 25px;
    background-color: var(--vert);
    color: var(--blanc);
    margin-left: 10px;

}
.container .content .icon:hover{
    color: var(--vert);
    background-color: var(--blanc);
    border: 1px solid var(--vert);
    cursor: pointer;

}


.general1{

/* border: 1px solid blue; */
 /* height: 100px; */
 max-width: 1140px;
display: flex;
flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 background-color: #fff;
margin: 10px auto 0 auto;
}
.nav-link{

 /* border: 1px solid red; */
 color: black;
 font-size: 20px;
 padding: 1rem;
}

.nav-link p{
  margin-bottom: 0!important;  

}
.nav-link:hover{

color: var(--vert);
cursor: pointer;
}
.fade:not(.show) {
 display: none;
 opacity: 0;
}
.nav-link.active{
 
color: var(--vert);
cursor: pointer;
}




@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');


.containe{
    max-width: 700px;
    width: 100%;
    background: #fff;

    border-radius: 5px;
    height: auto;
}

.containe .title::before{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    background: linear-gradient(123deg, #71b8e7,#9b59b6);
}
.containe form .user_details{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
form .user_details .input_pox{
    margin-bottom: 15px;
    margin: 20px 0 12px 0;
    width: calc(100% / 2 - 20px);
}
.user_details .input_pox .datails{
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
}
.user_details .input_pox input , .user_details .input_pox select{
    height: 45px;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-left: 15px;
    font-size: 16px;
    border-bottom-width: 2px;
    transition: all 0.3s ease;

}
.user_details .input_pox input:focus,.user_details .input_pox select:focus
.user_details .input_pox input:valid{
border-color: #9b59b6;
}
form .gender_details .gender_title{
    font-size: 20px;
    font-weight: 500;
}
form .gender_details .category{
    display: flex;
    width: 80%;
    margin: 14px 0;
    justify-content: space-between;
}
.gender_details .category label{
display: flex;
}
.gender_details .category .dot{
height: 18px;
width: 18px;
background: #d9d9d9;
border-radius: 50%;
margin-right: 10px;
border: 5px solid transparent;
}
#dot-1:checked ~ .category label .one,
#dot-2:checked ~ .category label .two,
#dot-3:checked ~ .category label .three{
border-color: #d9d9d9;
background-color: #9b59b6;
}
form input[type="radio"]{
    display: none;
}
form .button{
    height: 45px;
    margin: 45px 0;
}
form .button .sign{
    height: 100%;
    width: 24%;
    outline: none;
    color: #fff;
    border: none;
    font-size: 18px;
    font-weight: 500;
    border-radius: 5px;
    letter-spacing: 1px;
    background: linear-gradient(123deg, #71b8e7,#9b59b6);
    display: flex;
    align-items: center;
    justify-content: center;

}
form .button .sign:hover{
    background: linear-gradient(-123deg, #71b8e7,#9b59b6);
    cursor: pointer;
}
@media (max-width: 584px){
    .container{
        max-width: 100%;
    }
    form .user_details .input_pox{
        margin-bottom: 15px;
        width:100%;
    }
    form .gender_details .category{
        width: 100%;
    }
    .container form .user_details{
        max-height: 300px;
        overflow: scroll;
    }
    .user_details::-webkit-scrollber{
     width: 0;
    }
}
</style>