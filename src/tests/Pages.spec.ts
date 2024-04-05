import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import routes from "@/routes";
import Home from "@/templates/views/Home.vue";
import NoteList from "@/templates/views/NoteList.vue";
import NotFound from "@/templates/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

test("renders home page correctly", async () => {
  render(Home);
  expect(screen.getByText("Home Page")).toBeInTheDocument();
});

test("renders noteList page correctly", async () => {
  router.push("/notes");

  render(NoteList, {
    global: {
      plugins: [router, pinia],
    },
  });

  expect(screen.getByText("Note List")).toBeInTheDocument();
});

test("renders 404 page when route does not exist", async () => {
  router.push("/non-existent-route");

  render(NotFound, {
    global: {
      plugins: [router],
    },
  });

  expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  expect(
    screen.getByText("The page you requested does not exist.")
  ).toBeInTheDocument();
});
