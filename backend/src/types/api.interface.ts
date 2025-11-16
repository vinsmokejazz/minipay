export interface CreateUserInput {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInInput {
  username: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}