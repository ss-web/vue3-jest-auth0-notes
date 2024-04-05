import { authGuard } from "@auth0/auth0-vue";
import { ComponentOptionsMixin } from "vue";
import { RouteRecordRaw } from "vue-router";

import AuthenticatedLayout from "@/templates/layouts/AuthenticatedLayout.vue";
import UnauthenticatedLayout from "@/templates/layouts/UnauthenticatedLayout.vue";
import Home from "@/templates/views/Home.vue";
import Notes from "@/templates/views/NoteList.vue";
import NotFound from "@/templates/views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: UnauthenticatedLayout as unknown as ComponentOptionsMixin,
    children: [
      { path: "", component: Home as unknown as ComponentOptionsMixin },
    ],
  },
  {
    path: "/notes",
    name: "NoteList",
    component: AuthenticatedLayout as unknown as ComponentOptionsMixin,
    children: [
      { path: "", component: Notes as unknown as ComponentOptionsMixin },
    ],
    beforeEnter: authGuard,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound as unknown as ComponentOptionsMixin,
  },
];

export default routes;
