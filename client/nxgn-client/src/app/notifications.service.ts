import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

  snack: any = document.getElementById("snackbar");

  constructor() { }


  /**
   * desc - this methord generate a simple snack bar
   * 
   * @param message (string) - a message to diplay on snack. 
   */

  success(message) {

    this.snack.innerHTML = message;

    this.snack.className = "show";

    setTimeout(() => {

      this.snack.className = this.snack.className.replace("show", "");

    }, 3000);

  }




}
