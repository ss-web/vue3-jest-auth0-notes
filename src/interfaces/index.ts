import { ROLES } from "@/constants";

interface DefaultUser {
  id: string;
  username: string;
  picture: string;
  email: string;
}

export interface Auth0User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface Admin extends DefaultUser {
  role: typeof ROLES.ADMIN;
}

export interface User extends DefaultUser {
  role: typeof ROLES.USER;
}

export interface Note {
  id: string;
  content: string;
  author: Admin | User;
  createdAt: string;
  updatedAt: string | null;
}
