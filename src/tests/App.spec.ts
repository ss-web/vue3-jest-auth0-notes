import "@testing-library/jest-dom";

import * as auth0 from "@auth0/auth0-vue";
import { render } from "@testing-library/vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import routes from "@/routes";
import App from "@/templates/App.vue";

jest.mock("@auth0/auth0-vue");

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("App.vue", () => {
  it("renders loading screen when isLoading is true", async () => {
    (auth0 as typeof auth0).useAuth0 = jest.fn().mockReturnValue({
      user: {},
      isLoading: true,
    });

    const pinia = createPinia();

    const { getByText } = render(App, {
      global: {
        plugins: [router, pinia],
      },
    });

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders router view when isLoading is false", async () => {
    (auth0 as typeof auth0).useAuth0 = jest.fn().mockReturnValue({
      user: {},
      isLoading: false,
    });

    const pinia = createPinia();

    const { queryByText } = render(App, {
      global: {
        plugins: [router, pinia],
      },
    });

    expect(queryByText("Loading...")).not.toBeInTheDocument();
  });
});
