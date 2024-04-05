import { defineStore } from "pinia";

import { Admin, User } from "@/interfaces";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: <User | Admin>{},
  }),
  actions: {
    setUser(user: User | Admin) {
      this.user = user;
    },
  },
});
