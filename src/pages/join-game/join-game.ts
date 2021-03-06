import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the JoinGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-join-game',
    templateUrl: 'join-game.html',
})
export class JoinGamePage {

    gameId = '';
    userName = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JoinGamePage');
    }

    joinGame() {
        this.socket.connect();
        this.socket.emit('join-game', {room: this.gameId, user: this.userName});
        this.navCtrl.push('GamePage', { gameId: this.gameId });
    }

}
