import "@testing-library/jest-dom";

import * as auth0 from "@auth0/auth0-vue";
import { fireEvent, render } from "@testing-library/vue";

import AuthenticatedLayout from "@/templates/layouts/AuthenticatedLayout.vue";
import UnauthenticatedLayout from "@/templates/layouts/UnauthenticatedLayout.vue";

jest.mock("@auth0/auth0-vue");

describe("AuthenticatedLayout.vue", () => {
  it("renders authenticated user header with logout button", async () => {
    const loginWithRedirect = jest.fn();
    const logout = jest.fn();
    (auth0 as typeof auth0).useAuth0 = jest.fn().mockReturnValue({
      loginWithRedirect,
      logout,
    });

    const { getByText } = render(AuthenticatedLayout, {
      props: { text: "Authenticated User Header" },
    });

    expect(getByText("Authenticated User Header")).toBeInTheDocument();

    const logoutButton = getByText("logout");
    expect(logoutButton).toBeInTheDocument();

    await fireEvent.click(logoutButton);
    expect(logout).toHaveBeenCalled();
  });
});

describe("UnauthenticatedLayout.vue", () => {
  it("renders unauthenticated user header with login button", async () => {
    const loginWithRedirect = jest.fn();
    (auth0 as typeof auth0).useAuth0 = jest.fn().mockReturnValue({
      loginWithRedirect,
    });

    const { getByText } = render(UnauthenticatedLayout, {
      props: { text: "Unauthenticated User Header" },
    });

    expect(getByText("Unauthenticated User Header")).toBeInTheDocument();

    const loginButton = getByText("Sing in");
    expect(loginButton).toBeInTheDocument();

    await fireEvent.click(loginButton);
    expect(loginWithRedirect).toHaveBeenCalled();
  });
});
