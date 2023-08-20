import { createRouter, createWebHistory } from 'vue-router'
import LayoutPublic from "../views/Public/Loyout.vue"
import Accueil from "../views/Public/Accueil.vue"
import Connexion from "../views/Public/Connexion.vue"
import Inscription from "../views/Public/Inscription.vue"





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

       
      ]
    },
   
  ]
})

export default router
