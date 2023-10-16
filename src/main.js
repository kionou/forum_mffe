import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'maz-ui/css/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Notifications from '@kyvg/vue3-notification'
import store from './store'




import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
// import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSelect from 'maz-ui/components/MazSelect'
import MazAvatar from 'maz-ui/components/MazAvatar'
import MazTextarea from 'maz-ui/components/MazTextarea'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })

app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
// app.component('MazPhoneNumberInput', MazPhoneNumberInput)
app.component('MazSelect', MazSelect)
app.component('MazAvatar', MazAvatar)
app.component('MazTextarea', MazTextarea)


// app.use(store);
app.use(Notifications)
app.use(vuetify);
app.use(store);
app.use(router)
app.mount('#app')
