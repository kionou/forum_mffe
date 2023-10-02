import { createRouter, createWebHistory } from 'vue-router'
import authGuard from '@/lib/authGuard'; // Importez votre garde de route
import store  from '../store';
// public
import LayoutPublic from "../views/Public/Loyout.vue"
import Accueil from "../views/Public/Accueil.vue"
import Connexion from "../views/Public/Connexion.vue"
import Inscription from "../views/Public/Inscription.vue"
import Forum from "../views/Public/Forum.vue"
import Detail from "../views/Public/Detail.vue"
import Sujet from "../views/Public/Sujet.vue"
import Liste from "../views/Public/Liste_influente.vue"
import Profil from "../views/Public/Profil.vue"
import Moderatrice from "../views/Public/Moderatrice.vue"
import ValiderSujet from "../views/Public/ValiderSujet.vue"
import Accepter from "../views/Public/Accepter.vue"
import Rejeter from "../views/Public/rejeter.vue"
import Influente from "../views/Public/ProfilInfluent.vue"




import Test from "../views/Public/test.vue"

// administrateur

import Admin from "../views/Admin/Dashboard.vue"
import AccueilAd from "../views/Admin/Accueil.vue"
import Utilisateur from "../views/Admin/Utilisateur.vue"


// chat

import Chat from '../views/Public/ChatUser.vue'







const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutPublic,
      children:[
        { path: '/', name: 'accueil', component: Accueil},
        { path: '/connexion', name: 'Connexion', component: Connexion},
        { path: '/inscription', name: ' Inscription', component:  Inscription},
        { path: '/forum', name: ' Forum', component:  Forum ,  beforeEnter: authGuard,},
        { path: '/sujet', name: ' Sujet', component:  Sujet},
        { path: '/liste_influente', name: ' Liste', component:  Liste},
        { path: '/forum/:id', name: ' Detail', component:  Detail , props:true},
        { path: '/profil', name: ' Profil', component:  Profil},
        { path: '/moderatrice', name: ' Moderatrice', component:  Moderatrice},
        { path: '/moderatrice/sujet/:id', name: ' ValiderSujet', component:  ValiderSujet , props:true},
        { path: '/moderatrice/sujet/accepter', name: ' Accepter', component: Accepter },
        { path: '/moderatrice/sujet/rejeter', name: ' Rejeter', component: Rejeter },
        { path: '/infos-influente', name: ' Influente', component: Influente },
        { path: '/test', name: ' Test', component:  Test}

       
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children:[
        { path: '', name: 'admin-accueil', component: AccueilAd},
        { path: '/admin/utilisateur', name: 'admin-user', component: Utilisateur},

      ]
    
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      children:[
        { path: '', name: 'Chat', component: Chat},
       

      ]
    
    }
   
  ]
})



export default router
