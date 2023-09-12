// axiosConfig.js
import axios from 'axios';


// Créez une instance d'Axios avec la configuration souhaitée
// https://cors-proxy.fringe.zone/
const axiosInstance = axios.create({
  baseURL: ' http://localhost:5000/api/',
  headers: {
    // 'Content-Type': 'application/json', 
    // 'Content-Type': 'multipart/form-data',
  },
});



// Intercepteur de réponse (facultatif)
axiosInstance.interceptors.response.use(
  (response) => {
    // Vous pouvez effectuer des traitements supplémentaires sur la réponse ici
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exportez l'instance configurée d'Axios
export default axiosInstance;
