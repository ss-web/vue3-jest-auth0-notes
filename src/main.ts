import "@/assets/styles/style.css";

import { createAuth0 } from "@auth0/auth0-vue";
import { createPinia } from "pinia";
import { createApp } from "vue";

import router from "@/router";
import App from "@/templates/App.vue";

const app = createApp(App);
app.use(router);

const pinia = createPinia();
app.use(pinia);

app
  .use(
    createAuth0({
      domain: import.meta.env.VITE_AUTO_DOMAIN,
      clientId: import.meta.env.VITE_AUTO_CLIENT_ID,
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTO_CALLBACK_URL,
      },
    })
  )
  .mount("#app");
