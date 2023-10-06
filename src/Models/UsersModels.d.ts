export interface UsersResponse {
  map(arg0: (user: any) => any): unknown;
  status: number;
  id: number;
  username: string;
  email: string;
  password: string;
  roles: [string];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoadedUsers extends UsersResponse {
  _id: string;
}

export interface UserRoles {
  roles: string[];
  active: boolean;
}
