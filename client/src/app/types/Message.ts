export interface Message {
  sender: string;
  text: string;
  name?: string;
  fromMe?: boolean;
}
