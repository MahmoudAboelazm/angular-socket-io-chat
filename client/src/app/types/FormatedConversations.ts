import { Message } from './Message';

export interface FormatedConversation {
  names: string[];
  ids: string[];
  messages: Message[];
}
