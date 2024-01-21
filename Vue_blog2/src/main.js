/* Set up using Vue 3 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

/* import the bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"


/* import the fontawesome core (1) */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component (1) */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons (2) */
import { faBars, faPhone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library (2) */
library.add(faBars, faImage, faPhone, faMagnifyingGlass)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')