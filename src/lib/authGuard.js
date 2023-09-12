// authGuard.js
import store from '@/store';

const authGuard = (to, from, next) => {
  const user = store.getters.getUser; // Obtenez l'utilisateur depuis le store Vuex
  console.log('user',user);
  if (user) {
    // Si l'utilisateur est connecté, permettez-lui d'accéder à la route
    next();
  } else {
    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    next('/connexion'); // Vous pouvez personnaliser la redirection
  }
};

export default authGuard;
