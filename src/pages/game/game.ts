import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

    messages = [];
    gameId = '';
    user = '';
    host = false;
    message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {

      this.gameId = this.navParams.get('gameId');
      this.user = this.navParams.get('user');
      this.host = this.navParams.get('host');

      this.getMessages().subscribe(message => {
          this.messages.push(message);
      });

      this.getUsers().subscribe(data => {
          let user = data['user'];
          if (data['event'] === 'left') {
              this.showToast('User left: ' + user);
          } else {
              this.showToast('User joined: ' + user);
          }
      });

  }

    sendMessage() {
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    getUsers() {
        let observable = new Observable(observer => {
            this.socket.on('users-changed', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    ionViewWillLeave() {
        this.socket.disconnect();
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

}
