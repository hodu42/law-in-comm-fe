export interface ClientData {
  username: string;
  name: string;
  nickname: string;
  password: string;
  birth: string;
}

export type ClientMypageData = Omit<ClientData, "username" | "password">;
