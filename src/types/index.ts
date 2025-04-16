export interface User {
  id: string;
  username: string;
  password: string;
  is_enable: boolean;
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
  code: string;
  users: User[];
  top_role: Role;
  roles: Role[];
}