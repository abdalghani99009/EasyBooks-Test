export interface LoginFormData {
  userName: string;
  password: string;
}

export interface LoginSuccessResponse {
  userName: string;
  token: string;
}
