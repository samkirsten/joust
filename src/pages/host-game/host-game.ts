import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the HostGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-host-game',
    templateUrl: 'host-game.html',
})
export class HostGamePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HostGamePage');
    }

    hostGame() {
        this.socket.connect();
        this.socket.emit('create-game', {room: this.gameId, user: this.userName});
        this.navCtrl.push('GamePage', { gameId: this.gameId });
    }

}
