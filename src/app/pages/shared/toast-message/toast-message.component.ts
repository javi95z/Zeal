import { Component, OnInit } from "@angular/core";
import { ToastService, Message } from "@services";

@Component({
  selector: "z-notifications",
  templateUrl: "./toast-message.component.html",
  styleUrls: ["./toast-message.component.scss"]
})
export class ToastMessageComponent implements OnInit {
  messages: Promise<Message[]>;

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.messages = this.toast.getMessages();
  }

  remove(message: Message) {
    this.toast.removeToast(message);
  }
}
