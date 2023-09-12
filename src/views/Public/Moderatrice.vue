<template>
      <Loading v-if="loading"></Loading>
    <div class="general">
        
        <div class="container-card">
            
            <div
      class="cards"  >
      <div class="content">
        <div class="texte">
          <div class="total">
            <span>{{ nbretotal }}</span>
        </div>
        <div class="name">
            Sujets total
        </div>
        </div>   
        <div class="iconss">
          <i class='bx bxs-user'></i>
        </div>
      </div>
    </div>
    <div
      class="cards"  >
      <div class="content">
        <div class="texte">
          <div class="total">
            <span>{{ nbreaccepter }}</span>
        </div>
        <div class="name">
           Postuler
        </div>
        </div>   
        <div class="iconss">
          <i class='bx bxs-user'></i>
        </div>
      </div>
    </div>
    <div
      class="cards"  >
      <div class="content">
        <div class="texte">
          <div class="total">
            <span>{{ nbrerejeter }}</span>
        </div>
        <div class="name">
            Refuser
        </div>
        </div>   
        <div class="iconss">
          <i class='bx bxs-user'></i>
        </div>
      </div>
    </div>
        </div>

        <main class="forum-page__main stack"  style=" padding: 10px; background: #fff">
            <h2 style="    font-size: 22px;
    font-weight: bolder;">Nouveau(x) sujet(s)</h2>
        <div v-if="sujetsAvecStatutNull.length === 0">
            <div class="noresul">
          <p>aucun sujet postulé pour l'instant</p>
            </div>
        </div>
     
        
        <div class="cadre" v-else  v-for="sujet in sujetsAvecStatutNull" :key="sujet.id" @click="$router.push({ path: `/moderatrice/sujet/${sujet._id}`, })" >
          <div class="cadre_header">
            <div class="image">
              <img :src="sujet.user_id.image" alt="">
            </div>
            <div class="nom">
              <p> {{sujet.user_id.nom }} {{sujet.user_id.prenom}} , <span>il y'a, {{formatRelativeDate(sujet.createdAt) }}</span> </p>
            </div>
          </div>
          <div class="cadre_text">
            <h2>{{sujet.titre}} </h2>
          </div>
          <div class="interet">
            <p> {{sujet.centre_id.nom}} </p>
          </div>
          <div class="icon">
            <i class="bi bi-chat-dots"></i> <span>1</span>
          </div>
        </div>







      </main>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { formatRelativeDate } from '../../lib/dateUtils';
import Loading from '../../components/other/preloader.vue';
export default {
    name: 'ForumMffeModeratrice',
     components:{ Loading},



    data() {
        return {
//     socket : io('http://localhost:5000/api/sujet',{
//     withCredentials: true
// })
        sujetsAvecStatutNull:[],
        nbretotal:'',
        nbreaccepter:'',
        nbrerejeter:'' ,
         loading:true, 
            
        };
    },

  async  mounted() {
        // this.socket.on('message_All', (DataUser) => {
        
        //         console.log('data',DataUser);
        // });
        await this.fetchCentreOptions()
    },

    methods: {
        formatRelativeDate:formatRelativeDate,
        async fetchCentreOptions() {
            try {

                await this.$store.dispatch('fetchCentreData'); // Action spécifique aux bourses
                const options = JSON.parse(JSON.stringify(this.$store.getters['getCentreData']));

                await this.$store.dispatch('fetchSujetData'); // Action spécifique aux bourses
                const option = JSON.parse(JSON.stringify(this.$store.getters['getSujetData']));
                 console.log('Options centre:', option.data);

                this.CentreOptions = options.data;
                this.SujetOptions = option.data
                this.sujetsAvecStatutNull = option.data.filter(sujet => sujet.statut === null);
                this.nbreaccepter = option.data.filter(sujet => sujet.statut === "1").length;
                this.nbrerejeter  = option.data.filter(sujet => sujet.statut === "0").length;
                 this.nbretotal =  option.data.length
                this.loading = false

              
            } catch (error) {
                console.error('Erreur lors de la récupération des options des getCentreData:', error.message);
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
    .general{
    
/* border: 1px solid red; */
width: 100%;
height: 100vh;
max-width: 1140px;
margin: 20px auto;
    }

    .container-card{

  display: flex;
  grid-gap: 8px;
  padding: 10px;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fff;
    margin-bottom: 15px;

}



.cards {
    position: relative;
    width: 215px;
    height: 120px;
    cursor: pointer;
    /* border: 1px solid red; */
    border-radius: 5px;
    padding: 10px;
    margin-right: 15px;
    background-color: #1abc9c;
    color: var(--blanc);
  }

  .cards .content {
   display: flex;
   height: 100%;
    width: 100%;
    flex-direction: row;
    /* font-size: 20px; */
   
    justify-content: space-around;
    align-items: center;
  }
  .content .texte{
    height: 100%;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 10;
  
  }
  .content .iconss{
    display: block;
    padding-top: 26px;
    width: 80px;
    right: 40px;
    bottom: 9px;
  }
  .content .iconss i{
    color: rgba(0,0,0,.05);
    font-size: 85px;
    line-height: 65px;
  
  }



  @media (min-width: 800px) {
  .forum-header {
    display: flex;
    align-items: center;
  }
}



.forum-header {
  display: grid;
  gap: calc(2 * 8px);
}

.page-header {
  background: var(--blanc);
  border-bottom: 1px solid #d5e3ec;
  padding: calc(6 * 8px) 10px ;
}

.container,
.course-top-sidebar,
.cursus-section,
.footer,
.formation-single,
.formations,
.forum-page,
.header,
.layout-sidebar,
.sections>*,
.wave-header {
  box-sizing: border-box;
  width: 100%;
  padding-left: calc(50% - calc(100vw -20px * 2)/ 2);
  padding-right: calc(50% - calc(100vw - 20px * 2)/ 2);
}



.forum-header .hero-title {
  flex: none;
}

.auth-title,
.blog-post__title,
.blog-single__title,
.course-hero h1,
.hero-title,
.live-current__title,
.page__title {
  font-size: 52px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.forum-search {
  position: relative;
  max-width: 1140px;
    margin: 0 auto;
    width: 100%;
}

body .py3 {
  padding-top: calc(3 * 8px);
  padding-bottom: calc(3 * 8px);
}

@media (min-width: 800px) {
  .forum-page {
    grid-template-columns: 190px 1fr;
  }
}

.forum-page {
  display: grid;
  gap: calc(3 * 8px);
  /* grid-template-columns: 1fr; */
}

.bg {
  background: var(--background);
}

.flex {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.form-group input,
.form-group select,
.form-group textarea,
.ts-dropdown .dropdown-input,
.ts-input {
  border: 1px solid #d5e3ec;
  background: #f7fafb;
  border-radius: 3px;
  color: #121c42;
  padding: calc(1.5 * 8px) calc(1 * 8px);
  display: block;
  width: 100%;
  outline: 0;
  min-height: 48px;
}

.flex>* {
  min-width: 0;
}

input,
select {
  font-size: inherit;
  font-family: inherit;
}

.forum-search button {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.btn-secondary {
  font-weight: 400;
  color: var(--color) !important;
  background: #fff;
  border: 1px solid #d5e3ec !important;
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
  color: #fff;
  cursor: pointer;
  transition: filter .3s, background .3s, color .3s;
  font-size: .9em;
  filter: brightness(1);
  white-space: nowrap;
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


.chapters,
.chapters-split,
.forum-message,
.forum-messages,
.list-cursus,
.stack,
.stack-large,
.stack-separated {
  --gap: 2;
  display: grid !important;
  grid-template-columns: 1fr;
  align-content: flex-start;
  gap: calc(var(--gap) * 8px);
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

.chapters-split>*,
.chapters>*,
.forum-message>*,
.forum-messages>*,
.list-cursus>*,
.stack-large>*,
.stack-separated>*,
.stack>* {
  min-width: 0;
}

ol,
ul {
  list-style: none;
}

.forum-tags li li a {
  padding-left: calc(5 * 8px);
  font-size: .9rem;
}

.forum-tags a {
  display: flex;
  align-items: center;
  padding: 5px calc(1 * 8px);
}

a {
  text-decoration: none;
  color: inherit;
  transition: color .3s;
}

.chapters-split>*,
.chapters>*,
.forum-message>*,
.forum-messages>*,
.list-cursus>*,
.stack-large>*,
.stack-separated>*,
.stack>* {
  min-width: 0;
}

.flex-end {
  justify-content: flex-end;
}

.flex {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.haut{
border: 1px solid var(--vert);
justify-content: center;
    font-size: 16px;
    font-weight: bolder;
    background-color: var(--blanc);
    margin-bottom: 10px;

}

.cadre {
  /* border: 1px solid red; */
  width: 100%;
  /* height: 100px; */
  padding: 10px;
  background: var(--blanc);
  border: 1px solid #d5e3ec;
  box-shadow: 0 2px 4px #d8e1e8;
  position: relative;
  cursor: pointer;

}

/* .content:hover{
  background: var(--blanc);
  border: 1px solid #d5e3ec;
  box-shadow: 0 2px 4px #d8e1e8;

} */

.cadre_header .image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  position: absolute;
  top: 10px;

  /* border: 1px solid rgb(0, 255, 221); */

}

.cadre_header .image img {

  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.cadre_header .nom {
  margin-left: 59px;

}

.cadre_text {

  font-weight: 700;
  font-size: 20px;
  margin-left: 59px;
}

.interet {
  border: 1px solid #d5e3ec;
  border-radius: 6px;
  padding: 0px 5px;
  position: absolute;
  right: 48px;
  top: 40px;
  color: var(--color-text);

}

.icon {

  /* padding: 0px 5px; */
  position: absolute;
  right: 10px;
  top: 42px;
  color: var(--vert);
  font-weight: bolder;
  font-size: 14px;
}

</style>