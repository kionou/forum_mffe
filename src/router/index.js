import { createRouter, createWebHistory } from 'vue-router'
import LayoutPublic from "../views/Public/Loyout.vue"
import Accueil from "../views/Public/Accueil.vue"
import Connexion from "../views/Public/Connexion.vue"
import Inscription from "../views/Public/Inscription.vue"
import Forum from "../views/Public/Forum.vue"
import Detail from "../views/Public/Detail.vue"
import Sujet from "../views/Public/Sujet.vue"
import Liste from "../views/Public/Liste_influente.vue"
import Test from "../views/Public/test.vue"









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
        { path: '/forum', name: ' Forum', component:  Forum},
        { path: '/sujet', name: ' Sujet', component:  Sujet},
        { path: '/liste_influente', name: ' Liste', component:  Liste},
        { path: '/Detail', name: ' Detail', component:  Detail},
        { path: '/test', name: ' Test', component:  Test},


        

        



       
      ]
    },
   
  ]
})

export default router
