<template>
  <Loading v-if="loading" style="z-index: 9999;"></Loading>
  <div>
    <div class="contenu d-flex justify-content-center align-items-center flex-wrap w-100">
      <div class="two-section">
        <div class="table__body">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prenoms</th>
                <th>Email</th>
                <th>Numero</th>
                <th>Pseudo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedItems" :key="item.id">
                <td>{{ getSequentialNumber(index) }}</td>
                <td>{{ item.nom }}</td>
                <td>{{ item.prenom }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.numero }}</td>
                <td>{{ item.pseudo }}</td>

                <td>
                  <div class="sci">
                    <span style="--i: 1" class="update">
                      <i class="bi bi-pen" @click="updatedoc(item._id)"></i>
                    </span>
                    <span style="--i: 2" @click="hamdledelete(item._id)" class="delete">
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
      <Pag
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="updateCurrentPage"
      />
    </div>
  </div>
  <MazDialog v-if="isOpen" v-model="isOpen" width="621px" title="Enregistrement">
    <div class="containe">
      <form>
        <div class="user_details">
          <div class="input_pox">
            <span class="datails">Nom</span>
            <input type="text" placeholder="Nom" name="nom" v-model="nom" />
            <small v-if="v$.nom.$error">{{ v$.nom.$errors[0].$message }}</small>
          </div>
          <div class="input_pox">
            <span class="datails">Prenoms</span>
            <input type="text" placeholder="Prenoms" name="prenom" v-model="prenom" />
            <small v-if="v$.prenom.$error">{{ v$.prenom.$errors[0].$message }}</small>
          </div>
          <div class="input_pox">
            <span class="datails">Adresse Email</span>
            <input
              type="email"
              placeholder="Adresse Email"
              name="email"
              v-model="email"
            />
            <small v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>
          </div>
          <div class="input_pox">
            <span class="datails">Numéro Téléphonique</span>
            <input
              type="tel"
              placeholder="Numéro Téléphonique"
              name="numero"
              v-model="numero"
            />
            <small v-if="v$.numero.$error">{{ v$.numero.$errors[0].$message }}</small>
          </div>
          <div class="input_pox">
            <span class="datails">Nom d'utilisateur</span>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              name="pseudo"
              v-model="pseudo"
            />
            <small v-if="v$.pseudo.$error">{{ v$.pseudo.$errors[0].$message }}</small>
          </div>
          <div class="input_pox">
            <span class="datails">Role</span>
            <select
              class="form-select"
              aria-label="Default select example"
              name="genre"
              v-model="statut"
            >
              <option disabled selected>Choisissez une option</option>
              <option value="I">Influente</option>
              <option value="M">Moderatrice</option>
              <option value="L">Lambda</option>
            </select>
            <small v-if="v$.statut.$error">{{ v$.statut.$errors[0].$message }}</small>
          </div>
        </div>
        <div class="button">
          <div @click="submit" class="sign">Register</div>
          <!-- <input  class="sign" @click="submit" value="Register"> -->
        </div>
      </form>
    </div>
  </MazDialog>

  <MazDialog v-model="msgsuccess" title="Enregistrement de classification">
    <p>Classification enregistrée avec succès !!</p>
    <template #footer="{ close }">
      <div class="supp" @click="close" style="background-color: blue">Ok</div>
    </template>
  </MazDialog>
  <MazDialog v-model="isdelete" title="Suppression de la clasification">
    <p>Êtes-vous sûr de vouloir supprimer cette classification ?</p>
    <template #footer="{ close }">
      <div class="supp" @click="close" style="background-color: red">Non</div>

      <div class="supp" @click="confirmDelete" style="background-color: var(--vert)">
        Oui
      </div>
    </template>
  </MazDialog>
  <MazDialog v-model="confirmdelete" title="Suppression de la clasification">
    <p>Classification supprimée avec succès !!</p>
    <template #footer="{ close }">
      <div class="supp" @click="close" style="background-color: blue">Ok</div>
    </template>
  </MazDialog>
</template>

<script>
import MazDialog from "maz-ui/components/MazDialog";
import Pag from "../../other/pagination.vue";
import axios from "@/lib/axiosConfig.js";
import useVuelidate from "@vuelidate/core";
import Loading from  "../../other/preloader.vue"
import { require, lgmin, lgmax, ValidEmail, ValidNumeri } from "@/functions/rules";
export default {
  name: "ForumMffeLambda",
  props: ["LambdaOptions"],
  components: {
    MazDialog, Loading ,
    Pag,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["user/loggedInUser"];
    },

    totalPages() {
      // return Math.ceil(this.items.length / this.itemsPerPage);
      return Math.ceil(this.LambdaOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.LambdaOptions.slice(startIndex, endIndex);
    },
  },

  data() {
    return {
      msgsuccess: false,
      loading:false,
      isdelete: false,
      confirmdelete: false,
      isOpen: false,
      startIndex: 0,
      currentPage: 1,
      itemsPerPage: 10,
      v$: useVuelidate(),
      updateUserId: "",
      ToDeleteId:"",

      nom: "",
      prenom: "",
      email: "",
      pseudo: "",
      numero: "",
      statut: "",
      error: "",
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
      ValidEmail,
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
    console.log("data", this.LambdaOptions);
  },

  methods: {
    getSequentialNumber(index) {
      return this.startIndex + index + 1;
    },

    // delete picture
    hamdledelete(itemId) {
      console.log(itemId);
       this.ToDeleteId = itemId;
      this.isdelete = true;
    },
    async confirmDelete() {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/users/${this.ToDeleteId}`);
        console.log("Réponse de suppression:", response);
        if (response.data.statut === "success") {
          this.LambdaOptions;
          this.$emit("data-updated", this.LambdaOptions);
          this.confirmdelete = true;
          this.isdelete = false;
          this.loading = false;
        } else {
          console.log("error", response.data);
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        console.error("Erreur lors de la mise à jour des données MPME guinee :", error);
        
      }
    },

    updatedoc(id) {
      this.updateUserId = id;
      console.log(this.updateUserId, id);
      this.isOpen = true;
      this.GetUpdateUser = this.LambdaOptions;
      // Trouver le document correspondant dans le tableau userData
      const UserToUpdate = this.GetUpdateUser.find((doc) => doc._id === id);

      // Attribuer les valeurs aux champs d'
      this.nom = UserToUpdate.nom;
      this.prenom = UserToUpdate.prenom;
      this.email = UserToUpdate.email;
      this.numero = UserToUpdate.numero;
      this.pseudo = UserToUpdate.pseudo;
      this.statut = UserToUpdate.statut;

      console.log("classification à mettre à jour :", UserToUpdate);
    },

    async submit() {
      console.log("eeedata", "DataUser");
      this.v$.$touch();
      this.error = "";
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let DataUser = {
          nom: this.noms,
          prenom: this.prenom,
          email: this.email,
          pseudo: this.pseudo,
          numero: this.numero,
          statut: this.statut,
        };
        console.log("eeedata", DataUser);

        try {
          const response = await axios.put(`/users/${this.updateUserId}`, DataUser);
          console.log("response.sousprefecture", response);
          if (response.data.statut === "success") {
            this.LambdaOptions;
            this.$emit("data-updated", this.LambdaOptions);
            this.loading = false;
            this.msgsuccess = true;
            this.isOpen = false;
          } else {
            this.loading = false;
            return (this.error =
              "L'adresse e-mail existe déjà dans notre système. Veuillez vous connecter avec cette adresse.");
          }
        } catch (error) {
          console.error("Erreur post:", error);
          console.log("eee", error.response);
          this.loading = false;
          return (this.error = "Ce nom d'utilisateur existe déjà! ");
        }
      } else {
        console.log("pas bon", this.v$.$errors);
      }
    },

    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.LambdaOptions.slice(startIndex, endIndex);
    },
  },
};
</script>

<style lang="css" scoped>
.two-section {
  position: relative;
  min-height: 280px;
  width: 100%;
  height: auto;
  margin: 0 10px;
  display: flex;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
  border-radius: 0.5rem;
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
  --delay: 0.1s;
  transition: 0.5s ease-in-out var(--delay), background-color 0s;
}

tbody {
  border: 1px solid var(--jaune);
}

tbody tr td,
tbody tr td p,
tbody tr td img {
  transition: 0.2s ease-in-out;
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
  border: 1px solid #f9d310;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border-radius: 6px;
  font-size: 20px;
}

.contenu {
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

small {
  color: #f8001b;
  display: flex;
  align-items: center;
  justify-content: center;
}

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

.containe {
  max-width: 700px;
  width: 100%;
  background: #fff;

  border-radius: 5px;
  height: auto;
}

.containe .title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  background: linear-gradient(123deg, #71b8e7, #9b59b6);
}
.containe form .user_details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
form .user_details .input_pox {
  margin-bottom: 15px;
  margin: 20px 0 12px 0;
  width: calc(100% / 2 - 20px);
}
.user_details .input_pox .datails {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}
.user_details .input_pox input,
.user_details .input_pox select {
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
.user_details .input_pox input:focus,
.user_details .input_pox select:focus .user_details .input_pox input:valid {
  border-color: #9b59b6;
}
form .gender_details .gender_title {
  font-size: 20px;
  font-weight: 500;
}
form .gender_details .category {
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: space-between;
}
.gender_details .category label {
  display: flex;
}
.gender_details .category .dot {
  height: 18px;
  width: 18px;
  background: #d9d9d9;
  border-radius: 50%;
  margin-right: 10px;
  border: 5px solid transparent;
}
#dot-1:checked ~ .category label .one,
#dot-2:checked ~ .category label .two,
#dot-3:checked ~ .category label .three {
  border-color: #d9d9d9;
  background-color: #9b59b6;
}
form input[type="radio"] {
  display: none;
}
form .button {
  height: 45px;
  margin: 45px 0;
}
form .button .sign {
  height: 100%;
  width: 24%;
  outline: none;
  color: #fff;
  border: none;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  letter-spacing: 1px;
  background: linear-gradient(123deg, #71b8e7, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
}
form .button .sign:hover {
  background: linear-gradient(-123deg, #71b8e7, #9b59b6);
  cursor: pointer;
}
@media (max-width: 584px) {
  .container {
    max-width: 100%;
  }
  form .user_details .input_pox {
    margin-bottom: 15px;
    width: 100%;
  }
  form .gender_details .category {
    width: 100%;
  }
  .container form .user_details {
    max-height: 300px;
    overflow: scroll;
  }
  .user_details::-webkit-scrollber {
    width: 0;
  }
}
</style>
