<template>
   <Loading v-if="loading"></Loading>
    <div>
  <header class="page-header ">
  <div class="profil-header">
      
<div class="profile-pic">
  <label class="-label" for="file">
    <span class="glyphicon glyphicon-camera"></span>
    <span>Change Image</span>
  </label>
  <input id="file" type="file" @change="loadFile"/>
  <img :src="updateImageUrl" id="output" width="200" />
</div>
        <div class="profil-header__body">
      <h1 class="h1">Mon compte</h1>
      <p class="hstack" >
          <a class="pill small pill-darkgrey" href="/premium">Compte standard</a>
        <small>
          Inscrit <time-ago time="1621734914" prefix="depuis">{{ inscriptionDuration  }}</time-ago>
        </small>
      </p>
    </div>
  </div>
</header>



<div class="general">
<div class="general1" role="tablist">
  <div class="info-item d-flex justify-content-center align-items-center nav-link  active " role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-home1" aria-controls="navs-pills-top-home1" aria-selected="true" >
                <i class="bi bi-person me-2"></i>
                <div>
                  <p>Editer</p>
                </div>
              </div>
              <div class="info-item d-flex justify-content-center align-items-center nav-link "    role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-profile1" aria-controls="navs-pills-top-profile1" aria-selected="false" >
                <i class="bi bi-chat-left-text me-2"></i>
                <div>
                  <p>Sujet publier</p>
                </div>
              </div>
              <div class="info-item d-flex justify-content-center align-items-center nav-link " role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-messages1" aria-controls="navs-pills-top-messages1" aria-selected="false" >
                <i class="bi bi-people me-2"></i>
                <div>
                  <p>Abonner</p>
                </div>
              </div>
</div>
<div class="tab-pane fade show active  contenu" id="navs-pills-top-home1" role="tabpanel" >
     <Editer :data="data"/>

</div>
      <div class="tab-pane fade" id="navs-pills-top-profile1" role="tabpanel">
        
             <Commentaire/>
      </div>

      <div class="tab-pane fade" id="navs-pills-top-messages1" role="tabpanel">
        

     <Abonner/>

      </div>
</div>
    </div>
</template>

<script>
import Editer from '../../components/Public/Profil/edit.vue';
import Commentaire from '../../components/Public/Profil/commentaire.vue'
import Abonner  from '../../components/Public/Profil/abonner.vue';
import Loading from '../../components/other/preloader.vue';
import { mapGetters } from 'vuex';
import axios from '@/lib/axiosConfig.js'
import { formatRelativeDate } from '../../lib/dateUtils';
export default {
    name: 'ForumMffeProfil',
    components:{Editer , Commentaire , Abonner , Loading},
    computed: {
      ...mapGetters(['getUser']),
  },

    data() {
        return {
          updateImageUrl: '',
          data:'',
          inscriptionDuration: '',
          dataLoaded: false, 
          loading:true
        };
    },

  async  mounted() {
      console.log('Informations de l\'utilisateur :', this.getUser);
    await  this.fetchgetUser();
    },

    methods: {
      formatRelativeDate:formatRelativeDate,
      loadFile(event){

  console.log( event.target.files[0]);
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
        },

   async fetchgetUser(){
          try {      
        const response = await axios.get(`/users/${ this.getUser.user.email}`);
        console.log('response',response);
        if (response.data.status === "success") {
          this.data = response.data.data
          this.updateImageUrl = response.data.data.image
          this.dataLoaded = true;
          this.loading = false


         this.inscriptionDuration =  this.formatRelativeDate(response.data.data.createdAt)
        } else {
          
        }

    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
        
        },

    },
};
</script>

<style lang="css" scoped>
.page-header {
    background: var(--blanc);
    border-bottom: 1px solid var(--vert);
    padding: calc(6 * 8px);
 
}

.container, .course-top-sidebar, .cursus-section, .footer, .formation-single, .formations, .forum-page, .header, .layout-sidebar, .sections>*, .wave-header {
    box-sizing: border-box;
    width: 100%;
    padding-left: calc(50% - calc(100vw - 20px * 2)/ 2);
    padding-right: calc(50% - calc(100vw - 20px * 2)/ 2);
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
}
a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

@media (min-width: 600px){
  .profil-header {
    text-align: left;
    display: grid;
    grid-template-columns: 171px 1fr;
    align-items: center;
    gap: calc(2 * 8px);
}
}
@media (max-width: 599px){
  .profil-header {
    text-align: center;
}
}



@media (min-width: 600px){
  .profil-header__avatar {
    margin-left: 0;
}
}


.profil-header__avatar {
    display: block;
    width: 110px;
    height: 110px;
    border-radius: 110px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    background-color: var(--vert);
    border: solid 2px var(--vert);
}

.profil-header__avatar img {
    width: 100%;
    height: 100%;
    border-radius: 110px;
    transition: opacity .3s;
}

.profil-header__upload {
    width: 110px;
    height: 25px;
    background: var(--vert);
    transform: translateY(100%);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #9fb3c8;
}

.profil-header__upload .icon {
    width: 18px;
    height: 15px;
}

.profil-header__avatar input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

@media (min-width: 600px){
  .course-countdown_timer, .h1, .wave-header__title {
    font-size: 42px;
}
}


.course-countdown_timer, .h1, .wave-header__title {
    font-family: Inter,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 32px;
    line-height: 1.2;
}

.course-countdown_timer, .h1, .wave-header__title {
    font-size: 42px;
}

.pill.small {
    font-size: 11px;
    height: 18px;
    padding: 0 5px;
    font-weight: 400;
    line-height: 18px;
    border-radius: 3px;
}

.pill-darkgrey {
    color: #fff;
}
.pill {
    flex: none;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    position: relative;
    padding: calc(1 * 8px) calc(2 * 8px);
    color: var(--vert);
    font-size: 14px;
    font-weight: 700;
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: 20px;
}
.hstack>* {
    margin-left: calc(1 * 8px * .5);
    margin-right: calc(1 * 8px * .5);
    margin-bottom: calc(1 * 8px);
}
a {
    text-decoration: none;
    color: inherit;
    transition: color .3s;
}


.general{
/* border: 1px solid  red; */
width: 100%;
/* height: 200px; */

}

.general1{

   /* border: 1px solid blue; */
    /* height: 100px; */
    width: 100%;
   display: flex;
   flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;

}
.nav-link{
   
    /* border: 1px solid red; */
    color: black;
    font-size: 20px;
    padding: 1rem;
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

.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}
.profile-pic input {
  display: none;
}
.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 165px;
  height: 165px;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  border-radius: 100px;
  z-index: 0;
}
.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  width: 165px;
}
.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  color: #fafafa;
  transition: background-color 0.2s ease-in-out;
  border-radius: 100px;
  margin-bottom: 0;
}
.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
  height: 2em;
}



</style>