// import Vue from "vue";
import { createApp } from "vue";
import App from "./App";
import router from "./routes/index";
import store from "./store/index";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
