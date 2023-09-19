<template>
    <div>
    
      <div class="forum-page bg py3">
       
        <main class="forum-page__main stack">
          <div class="noresul" v-if="topicsPostes.length === 0">

<p>aucun sujet postuler pour l'instant</p>
</div>


<div class="cadre" v-else  v-for="sujet in topicsPostes" :key="sujet.id" @click="$router.push({ path: `/forum/${sujet._id}`, })" >
<div class="cadre_header">
  <div class="image" v-if="sujet.user_id">
    <img :src="sujet.user_id.image" alt="">
  </div>
  <div class="nom" v-if="sujet.user_id">
    <p>{{ sujet.user_id.nom }} {{ sujet.user_id.prenom }}, <span>il y'a,{{formatRelativeDate(sujet.createdAt) }}</span> </p>
  </div>
</div>
<div class="cadre_text">
  <h2>{{ sujet.titre }}</h2>
</div>
<div class="interet">
  <p>{{ sujet.centre_id.nom }}</p>
</div>
<div class="icon">
  <i class="bi bi-chat-dots"></i> <span>{{ commentaire(sujet._id) }}</span>
</div>
</div>
  
  
  
  
  
  
        </main>
      </div>
  
    </div>
  </template>
  
  <script>

import { formatRelativeDate } from '@/lib/dateUtils';
import { mapGetters } from 'vuex';
 

export default {
name: 'ForumMffeForum',
computed: {
      ...mapGetters(['getUser']),
  },


data() {
  return {
    CentreOptions:[],
    SujetOptions:[],
    commentsForTopic:[],
    nbreComment:'',
  inscriptionDuration:'',
  loading:true,
  topicsPostes: [],
  };
},

async mounted() {
await this.fetchCommentaireOptions()
await this.fetchCentreOptions()
console.log('Informations de l\'utilisateur :', this.getUser);




},

methods: {
  formatRelativeDate:formatRelativeDate,
  commentaire(id){
    return  this.nbreComment = this.commentsForTopic.data.filter(comment => comment.sujet_id._id === id).length;
  },
  async fetchCommentaireOptions() {
          try {

              await this.$store.dispatch('fetchCommentaireData'); // Action spécifique aux bourses
              this.commentsForTopic = JSON.parse(JSON.stringify(this.$store.getters['getCommentaireData']));
              console.log('options',this.commentsForTopic)
              
              

            
          } catch (error) {
              console.error('Erreur lors de la récupération des options des getCentreData:', error.message);
          }
      },

  async fetchCentreOptions() {
          try {

              await this.$store.dispatch('fetchCentreData'); // Action spécifique aux bourses
              const options = JSON.parse(JSON.stringify(this.$store.getters['getCentreData']));

              await this.$store.dispatch('fetchSujetData'); // Action spécifique aux bourses
              const option = JSON.parse(JSON.stringify(this.$store.getters['getSujetData']));
              const utilisateurConnecteId = this.getUser.user.id;
              this.CentreOptions = options.data;

              // Filtrer les sujets postés par l'utilisateur connecté
              this.topicsPostes = option.data.filter(sujet => sujet.statut === "1" && sujet.user_id._id === utilisateurConnecteId);
               console.log('Options centre:',  this.topicsPostes);

              this.loading = false;
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
    padding: calc(3 * 8px);
  }
  

  
  .forum-page {
  max-width: var(--max-width);
  margin: 0 auto;
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
  
  }
  
  .content:hover{
    background: var(--blanc);
    border: 1px solid #d5e3ec;
    box-shadow: 0 2px 4px #d8e1e8;
  
  }
  
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
  
  @media (max-width: 430px) {

    .nav-link {
    font-size: 14px;
    padding: 0.8rem;
}

}

@media (max-width: 460px) {
.cadre_text {

font-size: 17px;

}
.interet{
top: 8px;
}

.icon{
top: 12px;
}
}
  
  </style>