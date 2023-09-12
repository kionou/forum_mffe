<template>
        <Loading v-if="loading"></Loading>
    <div>
        <section class=" hero-grid my5 px-4">
            <div class="stack" style="align-self: flex-start">
                <h2 class="hero-title">
                    Créer un <br>
                    <strong>sujet</strong>
                </h2>
                <p class="hero-text">
                    Afin de maximiser vos chances d'obtenir de l'aide, essayez de décrire au mieux votre problème (ne copiez
                    pas des
                    centaines de lignes). Essayez de simplifier votre problème au maximum.
                </p>
            </div>
            <div class="stack-large">
                <form class="grid fit js-preventMultiSubmit" style="--col:300px">
                    <div class="d-flex justify-content-between " style="margin-bottom: 20px;">
                        <div class="form-group" style="max-width: 350px; width: 100%; padding: 0 10px;">
                            <label for="forum_topic_form_name" class="required">Titre</label>
                            <input type="text" id="forum_topic_form_name"   class="form-control" v-model="titre">
                          <small v-if="v$.titre.$error">{{ v$.titre.$errors[0].$message }}</small>  

                        </div>
                        <div class="form-group" style="max-width: 350px; width: 100%;  padding: 0 10px;">
                            <label for="forum_topic_form_name" class="required">Centre d'interet</label>
                            <select name="" id="" class="form-control" v-model="centre">
                                <option value="" selected="true">Choisir un centre d'interet</option>
                                <option v-for="centre in CentreOptions" :key="centre.id" :value="centre._id">{{ centre.nom }}</option>
                            </select>
                            <small v-if="v$.centre.$error">{{ v$.centre.$errors[0].$message }}</small>  
                        </div>
                    </div>
                    
                    
                    <div class="full form-group">
                        <div class="mdeditor">
                            <div class="mdeditor__toolbar">
                                <div class="mdeditor__toolbarleft">
                                    
                                    </div>
                                <div class="mdeditor__toolbarright">
                                   
                                    </div>
                            </div>
                          
                    </div>
                    <textarea id="forum_topic_form_content"  class="form-control" v-model="contenu" style="min-height: 250px;" placeholder="Votre Sujet.......">
           
                 </textarea>
                 <small v-if="v$.contenu.$error">{{ v$.contenu.$errors[0].$message }}</small>  
                 
                </div>
                <div class="full text-right">
                    <button  @click.prevent="submit" class="btn-gradient mt-4">Créer le sujet</button>
                </div>
               
            </form>
        </div>
    </section>
</div>
<MazDialog v-model="msgsuccesspost" >
        <p>
            Votre sujet a été soumis avec succès aux modérateurs pour examen et validation. Merci de patienter pendant qu'ils le vérifient.
        </p>
        <template #footer>
  
          <div class="supp" @click="close" style="background-color: blue; "> Ok</div>
  
        </template>
      </MazDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax, ValidEmail , ValidNumeri } from '@/functions/rules';
import { mapGetters } from 'vuex';
import io from 'socket.io-client';
import axios from '@/lib/axiosConfig.js'
import MazDialog from 'maz-ui/components/MazDialog'
import Loading from '../../components/other/preloader.vue';
export default {
    name: 'ForumMffeSujet',
     components:{MazDialog , Loading},
    computed: {
      ...mapGetters(['getUser']),
  },

    data() {
        return {
            titre:'',
            centre:'',
            contenu:'',
            CentreOptions:[],
            error:'',
            v$:useVuelidate(), 
            msgsuccesspost:false,
//             socket : io('http://localhost:5000/api/sujet/1',{
//              withCredentials: true
// })
        };
    },
    validations: {
        titre: {
      require,
      lgmin: lgmin(5), 
    },
    centre: {
      require,  
    },
    contenu: {
      require,
      lgmin: lgmin(20),
     
    },
 
  },

    mounted() {
        this.fetchCentreOptions()
        console.log('Informations de l\'utilisateur :', this.getUser);
        // this.socket.emit('nouveau_sujet', 'DataUser' );
    },

    methods: {
        async fetchCentreOptions() {
            try {

                await this.$store.dispatch('fetchCentreData'); // Action spécifique aux bourses
                const options = JSON.parse(JSON.stringify(this.$store.getters['getCentreData']));

                // await this.$store.dispatch('fetchSujetData'); // Action spécifique aux bourses
                // const option = JSON.parse(JSON.stringify(this.$store.getters['getSujetData']));
                // console.log('Options centre:', option.data);

                this.CentreOptions = options.data;
                // this.SujetOptions = option.data
            } catch (error) {
                console.error('Erreur lors de la récupération des options des getCentreData:', error.message);
            }
        },
 async submit() {
       
       this.v$.$touch()
       this.error = ''
       if (this.v$.$errors.length == 0 ) {
        this.loading = true
       
         let DataUser = {
         titre: this.titre,
         contenu: this.contenu,
         user_id:this.getUser.user.id,
         centre_id:this.centre
                 
       }
       console.log('datauser', DataUser);
    //    this.socket.emit('nouveau_sujet', DataUser );
    //    this.socket.on('message_influenceur', (messageId) => {
    //     console.log('message',messageId);
  // Mettre à jour l'état du message dans l'interface utilisateur
  // (par exemple, marquer le message comme approuvé)
// });

      
       try {
      const response = await axios.post('/sujet/1', DataUser);
  
      console.log('response.login', response); 
      if (response.data.statut === "success") {
        console.log(response.data);
       this.loading = false
       this.msgsuccesspost = true
       
          } else {
          return this.error = response.data.alert
          
          }
      
            } catch (error) {
            return this.error = "L'authentification a échoué"
            }
       
         }else{
        console.log('pas bon' , this.v$.$errors );

        }
   },
   close(){
    this.isOpen = false
    this.$router.push('/forum');

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
.chapters, .chapters-split, .forum-message, .forum-messages, .list-cursus, .stack, .stack-large, .stack-separated {
    --gap: 2;
    display: grid!important;
    grid-template-columns: 1fr;
    align-content: flex-start;
    gap: calc(2 * 8px);
}

body .my5 {
    margin-top: calc(5 * 8px);
    margin-bottom: calc(5 * 8px);
}



.hero-grid {
    --col-width: 400px;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: calc(4 * 8px);
    grid-auto-flow: dense;
}
.container, .course-top-sidebar, .cursus-section, .footer, .formation-single, .formations, .forum-page, .header, .layout-sidebar, .sections>*, .wave-header {
    box-sizing: border-box;
    width: 100%;
    padding-left: calc(50% - calc(100vw - 20px * 2)/ 2);
    padding-right: calc(50% - calc(100vw - 20px * 2)/ 2);
}

@media (min-width: 1100px){
    .hero-grid {
    grid-template-columns:400px 1fr;
    gap: calc(8 *8px);
}
}

a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

.auth-title, .blog-post__title, .blog-single__title, .course-hero h1, .hero-title, .live-current__title, .page__title {
    font-size: 52px;
    font-family: Inter,sans-serif;
    font-weight: 700;
    line-height: 1.2;
}

.chapters-split>*, .chapters>*, .forum-message>*, .forum-messages>*, .list-cursus>*, .stack-large>*, .stack-separated>*, .stack>* {
    min-width: 0;
}

@media (min-width: 600px){
    .course-hero, .hero-text, .wave-header__body {
    font-size: 22px;
}

}

.course-hero, .hero-text, .wave-header__body {
    font-size: 16px;
}


.stack-large  {
    
    gap: calc(4* 8px);
}

.grid.fit {
    grid-template-columns: repeat(auto-fit,minmax(var(300px,275px),1fr));
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

.form-group input, .form-group select, .form-group textarea, .ts-dropdown .dropdown-input, .ts-input {
    /* border: 1px solid var(--vert); */
    background: var(--blanc);
    border-radius: 3px;
    color: var(--color);
    padding: calc(1.5 * 8px) calc(1 * 8px);
    display: block;
    width: 100%;
    outline: 0;
    min-height: 48px;
}



.grid .full, .grid2 .full {
    grid-column: 1/-1;
}

.mdeditor {
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 10px rgba(0,0,0,.05);
    border: solid 1px var(--border);
    background: var(--bg);
    transition: box-shadow .3s;
}

.mdeditor__toolbar {
    position: relative;
    display: flex;
    z-index: 3;
    height: 34px;
    background-color: var(--bg);
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
}

.mdeditor__toolbar button {
    height: 34px;
    width: 34px;
    border: none;
    background: 0 0;
    cursor: pointer;
    outline: 0;
    color: var(--color-text);
}

.mdeditor__toolbar svg {
    margin-top: 3px;
    fill: currentColor;
    width: 15px;
    height: 15px;
}
.mdeditor__toolbarright {
    margin-left: auto;
}



.mdeditor .CodeMirror {
    height: auto;
}



.mdeditor .CodeMirror-scroll {
    background: var(--bg);
    min-height: 100px;
    max-height: calc(100vh - 200px);
}
.form-control:focus{
   box-shadow: none !important;
   border-color: var(--vert);
}




.btn-gradient {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .2) 100%) var(--vert);
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
</style>