<template>
    <Loading v-if="loading"></Loading>
    <div class="" v-if="SujetOne">
        <div class="page-header  topic-header ">
            <div class="general">
                <h1 class="h2 mb2">{{ SujetOne.titre }}</h1>
                <div class="topic-header__meta">
                    <a href="/profil/252637" class="topic-header__author forum-message__author">
                        <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: none;">
                            <img :src="baseUrl + '/' + SujetOne.user_id.image" alt="" style="width: 100%; height: 100%;">

                        </div>
                        {{ SujetOne.user_id.nom }} {{ SujetOne.user_id.prenom }}
                    </a>
                    <small class="topic-header__date"><time-ago>Il y a {{ formatRelativeDate(SujetOne.createdAt) }}
                        </time-ago>
                    </small>
                    <div class="topic-header__tags">
                        <div class="interet">

                            <p>{{ SujetOne.centre_id.nom }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class=" stack topic-page py5 px-4 general">

            <div class="forum-message">
                <div class="forum-message__body">
                    <div class="js-content formatted formatted">
                        <p>
                            {{ SujetOne.contenu }}
                        </p>

                    </div>
                    <div class="js-forum-edit"></div>
                </div>
            </div>

            <div class="mb1">
                <h2 class="h3 mt3 mb1">
                    <forum-count v-if="commentsForTopic.length === 0" style="font-weight: bolder;">Aucune
                        réponse</forum-count>
                    <forum-count v-else style="font-weight: bolder;">{{ commentsForTopic.length }} réponse(s)</forum-count>

                </h2>
                <hr>
            </div>

            <div class="forum-messages">
                <div class="noresul" v-if="commentsForTopic.length === 0">
                    Aucun commentaire pour le moment !!!
                </div>

                <div v-else class="forum-message is-reply " v-for="comment in commentsForTopic" :key="comment.id" :data-id="comment._id">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex">
                            <div class="forum-avatar">
                                <img :src="baseUrl + '/' + comment.user_id.image" alt="" class="forum-message__avatar">
                            </div>
                            <div class="forum-message__header">
                                <a href="/profil/305506" class="forum-message__author">
                                    {{ comment.user_id.nom }} {{ comment.user_id.prenom }}
                                </a>
                                <div class="forum-message__meta">
                                    <a href="#message-139346"><time-ago time="1692365782"> , Il y a {{
                                        formatRelativeDate(comment.createdAt) }}</time-ago></a>
                                    <forum-edit message="139346" owner="305506"></forum-edit>
                                    <forum-delete message="139346" owner="305506"></forum-delete>
                                </div>

                            </div>
                        </div>
                        <div class="icon1 ">
                            <div class=" icone" id="dropdownMenuButton1"   @click="toggleDropdown(comment)">
                                <i class="bi bi-exclamation-octagon"></i>
                            </div>
                            <div class=""  v-if="comment.isDropdownVisible" >
                                <form class="forum-report__form stack">
                                    <div class="form-group">
                                        <label for="reason">Raison du signalement</label>
                                        {{ comment._id }}
                                        <textarea name="reason" id="reason" type="textarea" style="min-height: 200px;"
                                            placeholder="Indiquez en quoi ce sujet ne convient pas"
                                            v-model="step2.contenu"></textarea>
                                        <small v-if="v$.step2.contenu.$error && step2.contenu.trim() !== ''">{{
                                            v$.step2.contenu.$errors[0].$message }}</small>
                                    </div>
                                    <button class="btn btn-primary"
                                        @click.prevent="HamdleSignaler(comment._id)">Envoyer</button>
                                </form>
                            </div>
                        </div>


                    </div>


                    <div class="forum-message__body">
                        <div class="formatted card js-content p2">
                            <p> {{ comment.contenu }}
                            </p>

                        </div>
                        <div class="js-forum-edit"></div>
                    </div>
                </div>

                <forum-create-message>
                    <form>
                        <div class="stack">
                            <div class="form-group "><label for="content">Votre message</label>
                                <div class="mdeditor">
                                    <div class="mdeditor__toolbar">
                                        <div class="mdeditor__toolbarleft">

                                        </div>
                                        <div class="mdeditor__toolbarright">

                                        </div>
                                    </div>

                                </div>
                                <textarea id="forum_topic_form_content" class="form-control" v-model="step1.contenu">

                                    </textarea>
                                <small v-if="v$.step1.contenu.$error && step1.contenu.trim() !== ''">{{ v$.step1.contenu.$errors[0].$message }}</small>
                             
                            </div>

                            <button class="btn btn-primary" @click.prevent="submit">Répondre</button>
                        </div>
                    </form>
                </forum-create-message>
            </div>

        </div>
    </div>
    <MazDialog v-model="msgsuccesspost">
        <p>
            Votre commentaire a été ajouté
        </p>
        <template #footer="{ close }">

            <div class="supp" @click="close" style="background-color: blue; "> Ok</div>
        </template>
    </MazDialog>
    <MazDialog v-model="msgsignaler">
        <p>
            Votre Avis a été envoyer au moderateur avec success !!
        </p>
        <template #footer="{ close }">

            <div class="supp" @click="close" style="background-color: blue; "> Ok</div>
        </template>
    </MazDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax, ValidEmail, ValidNumeri } from '@/functions/rules';
import axios from '@/lib/axiosConfig.js'
import Loading from '../../components/other/preloader.vue';
import { formatRelativeDate } from '../../lib/dateUtils';
import MazDialog from 'maz-ui/components/MazDialog'
import { mapGetters } from 'vuex';
export default {
    name: 'ForumMffeDetail',
    props: ['id'],
    computed: {
        ...mapGetters(['getUser']),
    },

    components: {
        Loading, MazDialog
    },

    data() {
        return {
            SujetOne: '',
            loading: true,
            error: '',
            v$: useVuelidate(),
            msgsuccesspost: false,
            commentsForTopic: [],
            isDropdownVisible: false,
            msgsignaler:false,
            baseUrl: 'http://localhost:5000',
            step1: {
                contenu: '',
            },
            step2: {
                contenu: '',
            },


        };
    },
    validations: {
        step1: {
            contenu: {
                require,
                lgmin: lgmin(2),

            },
        },
        step2: {
            contenu: {
                require,
                lgmin: lgmin(2),

            },
        }
    },




  async  mounted() {
    console.log('id', this.id);
    console.log('Informations de l\'utilisateur :', this.getUser);
    await this.fetchOneSujet()
    await this.fetchCommentaireOptions()
  

},

methods: {
    formatRelativeDate: formatRelativeDate,
        async fetchOneSujet(){
        try {
            const response = await axios.get(`/sujet/${this.id}`);
            console.log('response.sousprefecture', response);
            if (response.data.statut === 'success') {
                this.SujetOne = response.data.data
                this.loading = false
            } else {

            }

        } catch (error) {
            console.error('Erreur post:', error);
            //  console.log("eee",error.response.data.alert);
            //  return this.error = "Ce nom d'utilisateur existe déjà! "
        }
    },

    async fetchCommentaireOptions() {
        try {

            await this.$store.dispatch('fetchCommentaireData'); // Action spécifique aux bourses
            const allComments = JSON.parse(JSON.stringify(this.$store.getters['getCommentaireData']));
            console.log('optionszzz', allComments)
            if (allComments && allComments.data) {
                this.commentsForTopic = allComments.data
                .filter(comment => comment.sujet_id._id === this.id && comment.statut === true)
                .map(comment => ({
                    ...comment,
                    isDropdownVisible: false,
                }));
                console.log('Commentaires pour le sujet', this.commentsForTopic);
            } else {
                console.log('Aucun commentaire disponible.');
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des options des commentaire:', error.message);
        }
    },
     async submit() {

        this.error = ''
        this.v$.step1.$touch()
        if (this.v$.$errors.length == 0) {
            this.loading = true

            let DataUser = {
                contenu: this.step1.contenu,
                user_id: this.getUser.user.id,
                sujet_id: this.id

            }
            console.log('datauser', DataUser);

            try {
                const response = await axios.post('/commentaire', DataUser);

                console.log('response.login', response);
                if (response.data.statut === "success") {
                    console.log(response.data);
                    this.step1.contenu = ''
                    await this.fetchCommentaireOptions()
                    this.loading = false
                    this.msgsuccesspost = true

                } else {
                    return this.error = response.data.alert

                }

            } catch (error) {
                return this.error = "L'authentification a échoué"
            }

        } else {
            console.log('pas bon', this.v$.$errors);

        }
    },
    toggleDropdown(comment) {
    comment.isDropdownVisible = !comment.isDropdownVisible;
},

async HamdleSignaler(id){
        this.error = ''
        this.v$.step2.$touch()
        if (this.v$.$errors.length == 0) {
            this.loading = true
            this.isDropdownVisible = false
            let DataUser = {
                contenu: this.step2.contenu,
                user_id: this.getUser.user.id,
                commentaire_id: id

            }
            console.log('datauser', DataUser);

            try {
                const response = await axios.post('/signaler', DataUser);

                console.log('response.login', response);
                if (response.data.statut === "success") {
                    console.log(response.data);
                    this.step2.contenu = ''
                    await this.fetchCommentaireOptions()
                    this.loading = false
                    this.msgsignaler = true

                } else {
                    return this.error = response.data.alert

                }

            } catch (error) {
                return this.error = "L'authentification a échoué"
            }

        } else {
            console.log('pas bon', this.v$.$errors);

        }

    }
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

.general {

    width: 100%;
    margin: 0 auto;
}

@media (min-width: 700px) {
    .topic-header {
        display: flex;

        margin-top: 10px;
    }
}

.topic-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(2 * 8px);
    margin-top: 0 !important;

}

.page-header {
    background: var(--blanc);
    border-bottom: 1px solid #d5e3ec;
    padding: calc(6 * 8px) 10px calc(6 * 8px) 10px;
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
    padding-left: calc(50% - calc(100vw - 20px * 2)/ 2);
    padding-right: calc(50% - calc(100vw - 20px * 2)/ 2);
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

body .mb2 {
    margin-bottom: calc(2 * 8px);
}

.comments__title,
.formatted h2,
.h2,
.modal-box header {
    font-weight: 700;
    font-style: normal;
    font-size: 40px;
    line-height: 1.2;
}

.topic-header__meta {
    display: flex;
    align-items: center;
    gap: 0.5em;
    justify-content: space-between;
    margin-top: 43px;
}

.topic-header__author {
    flex: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
    color: inherit;
    transition: color .3s;
}

body .mr1 {
    margin-right: calc(1 * 8px);
}

.rounded {
    border-radius: 50%;
}

@media (min-width: 700px) {
    .topic-header__date {
        text-transform: lowercase;
        margin-left: -0.5em;
    }
}


.topic-header__date {
    flex: none;
    white-space: nowrap;
    color: var(--text-color);
}

.text-small,
small {
    font-size: .9em;
}

.topic-header__tags {
    display: flex;
    gap: calc(1 * 8px);
    flex-wrap: wrap;
}

body .py5 {
    padding-top: calc(5 * 8px);
    padding-bottom: calc(5 * 8px);
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
    gap: calc(2 * 8px);
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
    padding-left: calc(50% - calc(100vw - 20px * 2)/ 2);
    padding-right: calc(50% - calc(100vw - 20px * 2)/ 2);
}

.forum-message {
    grid-row-gap: 8px;
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
    gap: calc(2 * 8px);
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

.forum-message ol,
.forum-message p,
.forum-message ul {
    margin-bottom: 1rem;
}

.formatted ol,
.formatted p,
.formatted ul {
    line-height: 1.6;
}

.formatted blockquote,
.formatted ol,
.formatted p,
.formatted ul {
    margin-top: 1rem;
    margin-bottom: 30px;
    font-size: var(--paragraphe);
}

body .mb1 {
    margin-bottom: calc(1 * 8px);
}

.forum-messages {
    --gap: 5;
}

body .mt3 {
    margin-top: calc(3 * 8px);
}

.h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.3;
}

.forum-message .is-reply {
    display: grid;
    grid-template-columns: 50px 1fr;
}

.forum-message {
    grid-row-gap: 8px;
}

.forum-message.is-reply .forum-avatar {
    width: 50px;
    height: 50px;
}

@media (min-width: 700px) {
    .forum-message .forum-avatar {
        grid-row: 1/span 2;
    }
}

.forum-avatar {
    position: relative;
    width: 40px;
    height: 40px;
    flex: none;
    border-radius: 40px;
}

.forum-avatar img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50px;
}



.forum-message__header {
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 90px;
    flex-wrap: wrap;
    margin-left: 13px;
}

.forum-message__author {
    display: flex;
    align-items: center;
    font-family: Inter, sans-serif;
    font-weight: bolder;
    color: var(--noir);
    white-space: nowrap;
    margin-right: 3px;
}

.forum-message__meta {
    display: flex;
    align-items: center;
    font-size: .9em;
    white-space: nowrap;
    color: var(--text-color);
}

.forum-message__body .card {
    display: block;
}

body .p2 {
    padding: calc(2 * 8px);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
}

.alert,
.auth-form,
.card,
.card--stacked::after,
.card--stacked::before,
.chapters-split>*,
.course,
.cursus-card,
.dropdown ul,
.forum-report__form,
.notifications,
.pagination a,
.podcast-suggestion__vote,
.requirements,
.search-header .search-input_suggestions,
.tree-item {
    background: var(--blanc);
    border: 1px solid #d5e3ec;
    box-shadow: 0 2px 4px #d8e1e8;
    border-radius: 3px;
    transition: .3s;
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

.forum-messages .mdeditor {
    height: auto;
}

.mdeditor {
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 10px rgba(0, 0, 0, .05);
    border: solid 1px #d5e3ec;
    background: var(--bg);
    transition: box-shadow .3s;
}

.mdeditor__toolbar {
    position: relative;
    display: flex;
    z-index: 3;
    height: 34px;
    background-color: var(--blanc);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
}

.mdeditor__editor {
    top: 34px;
    left: 0;
    height: calc(100% - 34px);
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 2;
    background: var(--bg);
}



.form-group textarea {
    min-height: 200px;

}

.stack>button {
    justify-self: flex-start;
}

.btn-primary {
    background: var(--vert);
    border: solid 1px var(--vert);
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



.mdeditor {
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 10px rgba(0, 0, 0, .05);
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
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

.form-control:focus {
    box-shadow: none !important;
    border-color: var(--vert);
}

.form-group textarea {
    min-height: 250px;
}

.interet {
    border: 1px solid #d5e3ec;
    border-radius: 6px;
    padding: 0px 5px;
    /* position: absolute; */
    right: 48px;
    top: 40px;
    color: var(--color-text);
}

.icone {

    border-radius: 50%;
    padding: 5px 10px;
    transition: transform 0.3s ease;
    background-color: #e6eff4;
    font-size: 20px;
    cursor: pointer;

}

.icone:hover {

    transform: scale(1.1);

}

.forum-report__form {
    top: auto;
    position: absolute;
    z-index: 10;
    padding: calc(2 * 8px);
    line-height: 1.4;
    right: 15px;
    width: 300px;
}

.form-group input,
.form-group select,
.form-group textarea,
.ts-dropdown .dropdown-input,
.ts-input {
    /* border: 1px solid var(--vert); */
    background: var(--bg);
    border-radius: 3px;
    color: var(--color);
    padding: calc(1.5 * 8px) calc(1 * 8px);
    display: block;
    width: 100%;
    outline: 0;
    /* min-height: 48px; */
}</style>