export interface ClientData {
  username: string;
  name: string;
  nickname: string;
  password: string;
  birthDate: string;
}

export type ClientMypageData = Omit<ClientData, "username" | "password">;
