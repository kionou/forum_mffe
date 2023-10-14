<template>
        <Loading v-if="loading" style="z-index: 9999;"></Loading>
    <div>
        <div class="contenu d-flex justify-content-center align-items-center flex-wrap  w-100"  >

            <div class="two-section">


                <div class="table__body">
                    <table>
                        <thead>

                            <tr>
                                <th> # </th>
                                <th> Nom</th>
                                <th>Action</th>

                            </tr>

                        </thead>
                        <tbody>

                            <tr v-for="(item, index) in paginatedItems" :key="item.id" >
                                <td> {{ getSequentialNumber(index)  }}  </td>
                                <td> {{ item.nom }} </td>
                               
  
                                <td >
                                    <div class="sci">
                                        <span style="--i:1" class="update">
                                            <i class="bi bi-pen" @click="updatedoc(item._id)"></i>

                                        </span>
                                        <span style="--i:2" @click="hamdledelete(item._id)" class="delete">
                                            <i class="bi bi-trash"></i>
                                        </span>

                                    </div>
                                </td>

                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="container_pagination">
            <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
          </div>
    </div>
    <MazDialog v-if="isOpen" v-model="isOpen" width="380px" title="Modification du centre d'intérêt"  >
        <div class="containe">
            <form >
                <div class="user_details">
                    <div class="input_pox">
                        <span class="datails">Nom</span>
                        <input type="text" placeholder="Nom" name="nom" v-model="nom">
                        <small v-if="v$.nom.$error">{{ v$.nom.$errors[0].$message }}</small>
                    </div>
                 
                    </div>
                
                <div  class="button">
                  <div  @click="submit" class="sign">Register</div>
                <!-- <input  class="sign" @click="submit" value="Register"> -->
    
                    
                </div>
            </form>
        </div>
  </MazDialog>
    
    <MazDialog v-model="msgsuccess"  title="Enregistrement de classification" >
        <p>
            Classification enregistrée avec succès !!
        </p>
        <template #footer="{ close }">

            <div class="supp" @click="close" style="background-color: blue; "> Ok</div>

        </template>
    </MazDialog>
    <MazDialog v-model="isdelete" title="Suppression de la clasification">
        <p>
            Êtes-vous sûr de vouloir supprimer cette classification ?
        </p>
        <template #footer="{ close }">

            <div class="supp" @click="close" style="background-color: red; "> Non</div>

            <div class="supp" @click="confirmDelete" style="background-color: var(--vert);"> Oui</div>

        </template>
    </MazDialog>
    <MazDialog v-model="confirmdelete" title="Suppression de la clasification">
        <p>
            Classification supprimée avec succès !!
        </p>
        <template #footer="{ close }">

            <div class="supp" @click="close" style="background-color: blue; "> Ok</div>



        </template>
    </MazDialog>

  

 
</template>

<script>
import MazDialog from 'maz-ui/components/MazDialog'
import Pag from '../../other/pagination.vue';
import axios from '@/lib/axiosConfig.js'
import useVuelidate from '@vuelidate/core';
import Loading from  "../../other/preloader.vue"
import { require, lgmin, lgmax, ValidEmail , ValidNumeri } from '@/functions/rules';
export default {
    name: 'ForumMffeLambda',
    components: {
    MazDialog, Pag , Loading
    
  },
  computed: {
      loggedInUser() {
        return this.$store.getters["user/loggedInUser"];
      },
  
      totalPages() {
        // return Math.ceil(this.items.length / this.itemsPerPage);
        return Math.ceil(this.CentreOptions.length / this.itemsPerPage);
      },
      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.CentreOptions.slice(startIndex, endIndex);
      },
    },

    data() {
        return {
            msgsuccess:false,
            isdelete:false,
            loading:true,
            confirmdelete:false,
            CentreOptions:[],
            isOpen:false,
            startIndex: 0,
            currentPage: 1,
            itemsPerPage: 10,
            updateClassId:'',
            ToDeleteId:'',
            v$:useVuelidate(), 
            
                 
            nom: '',
           
            
        };
    },
    validations: {
    nom: {
      require, 
      lgmin: lgmin(2),
      lgmax: lgmax(20),  
    },
    
   
 
  },

  async   mounted() {
     await   this.fetchCentreOptions()  


        
    },

    methods: {

        async fetchCentreOptions() {
            try {

                await this.$store.dispatch('fetchCentreData'); // Action spécifique aux bourses
                const options = JSON.parse(JSON.stringify(this.$store.getters['getCentreData']));
                 console.log('Options centre:', options.data);
                 this.CentreOptions = options.data
                this.loading = false
            } catch (error) {
                console.error('Erreur lors de la récupération des options des getCentreData:', error.message);
            }
        },
        
        getSequentialNumber(index) {
            return this.startIndex + index + 1;
        },

        // delete picture
        hamdledelete(itemId) {
            console.log(itemId);
             this.ToDeleteId = itemId;
            this.isdelete = true

        },
        async confirmDelete() {
            this.loading = true


            try {
                // Faites une requête pour supprimer l'élément avec l'ID itemId
                const response = await axios.delete(`/centre/${this.ToDeleteId}`, {
                   
                });
                console.log('Réponse de suppression:', response);
                if (response.data.statut === 'success') {
                    await this.fetchCentreOptions() 
                    this.confirmdelete = true
                    this.isdelete = false
                    this.loading = false


                } else {
                    console.log('error', response.data)
                    this.loading = false

                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
               

            }
        },

        updatedoc(id) {
             this.updateClassId = id
            this.isOpen = true
            // Trouver le document correspondant dans le tableau userData
             const classificationToUpdate = this.CentreOptions.find(doc => doc._id === id);

            // // Attribuer les valeurs aux champs d'
             this.nom = classificationToUpdate.nom;
        
            console.log('classification à mettre à jour :', classificationToUpdate);


        },

        async submit() {
        console.log('eeedata', 'DataUser');
       this.v$.$touch()
       this.error = ''
       if (this.v$.$errors.length == 0 ) {
        this.loading = true
         let DataUser = {
         nom: this.nom,
        
                 
       }
       console.log('eeedata', DataUser);
      
       try {
         const response = await axios.put(`/centre/${this.updateClassId}`, DataUser);
         console.log('response.sousprefecture', response);
         if (response.data.statut === 'success') {
            this.fetchCentreOptions() 
            this.isOpen = false
            this.loading = false
            this.msgsuccess = true
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

        updateCurrentPage(pageNumber) {
            this.currentPage = pageNumber;
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
            });
        },
        updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.CentreOptions.slice(startIndex, endIndex);
    },
    },
};
</script>

<style lang="css" scoped>

.two-section {
    position: relative;
    min-height: 280px;
    width: 70%;
    height: auto;
    margin: 0 10px;
    display: flex;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    background-color: var(--blanc);

}

.table__body {
    width: 97%;
    max-height: calc(89% - 9.6rem);
    overflow: auto;
    overflow: overlay;
    padding-bottom: 10px;
}

.table__body::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
}

.table__body::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #0004;
    visibility: hidden;
}

.table__body:hover::-webkit-scrollbar-thumb {
    visibility: visible;
}

table {
    width: 100%;
}

table,
th,
td {
    border-collapse: collapse;
    padding: 10px;
    text-align: center;
    font-size: 15px;
}



thead th {
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--vert);
    text-transform: capitalize;
    color: white;
    border: 1px solid var(--jaune);
}



tbody:nth-child(odd) tr:nth-child(odd) {
    background-color: #0000000b;
}

tbody:nth-child(even) tr:nth-child(even) {
    background-color: #0000000b;
}


tbody tr {
    --delay: .1s;
    transition: .5s ease-in-out var(--delay), background-color 0s;
}

tbody {
    border: 1px solid var(--jaune);

}

tbody tr td,
tbody tr td p,
tbody tr td img {
    transition: .2s ease-in-out;
}


td {
    border: 1px solid var(--jaune);
}


@media (max-width: 1000px) {
    td:not(:first-of-type) {
        min-width: 10rem;
    }
}

@media (max-width: 768px) {

    table,
    th,
    td {
        font-size: 12px;
    }
}

.noresul {
    border: 1px solid #F9D310;
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    border-radius: 6px;
    font-size: 20px;

}



.contenu{

margin: 40px 0 20px 0;

}

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


.container_pagination {
    /* border: 1px solid red; */
    width: auto;
    text-align: end;
    /* height: 50px; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin: 5px;
    background-color: var(--blanc);

}

.supp:hover {
    background-color: #fff;


}

.sci {
    bottom: 10px;
    left: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    /* border: 1px solid red; */
}

.sci span {
    margin: 0 10px;
    font-size: 18px;
    border-radius: 6px;
    color: #fff;
    z-index: 4;
    cursor: pointer;
    padding: 5px 10px;

}





.update {
    background-color: rgb(63, 134, 255);
}

.update:hover {
    background-color: #fff;
    color: rgb(63, 134, 255);
    border: 1px solid rgb(63, 134, 255);
}

.delete {
    background-color: red;
}

.delete:hover {
    background-color: #fff;
    color: red;
    border: 1px solid red;
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

form .user_details .input_pox{
    margin-bottom: 15px;
    margin: 20px 0 12px 0;

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