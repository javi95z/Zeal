import { Injectable } from "@angular/core";

export class Message {
  content: string;
  style: string;
  dismissed = false;

  constructor(content: string, style?: string) {
    this.content = content;
    this.style = style || "info";
  }
}

@Injectable()
export class ToastService {
  messages: Message[] = [];
  timeDismissal = 5000;

  constructor() {}

  getMessages(): Promise<Message[]> {
    return new Promise((res, rej) => res(this.messages));
  }

  setMessage(content: string, style: string = "info"): Message {
    const msg = new Message(content, style);
    this.messages.push(msg);
    this.setCountdown();
    return msg;
  }

  removeToast(toast: Message) {
    toast.dismissed = true;
  }

  private setCountdown() {
    this.getMessages().then((res: Message[]) => {
      res.forEach(item =>
        setTimeout(() => this.removeToast(item), this.timeDismissal)
      );
    });
  }
}
