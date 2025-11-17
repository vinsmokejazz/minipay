export interface AuthCredentials {
  username: string;
  password: string;
}

export interface SignUpPayload extends AuthCredentials {
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: UserProfile;
}

export interface UserProfile {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

export interface BalanceResponse {
  balance: number;
}

export interface TransferPayload {
  to: string;
  amount: number;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  fromBalance: number;
  toBalance?: number;
}
