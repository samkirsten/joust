import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

/**
 * Class for the GameHostedPage page. This handles the game play when a game has been hosted.
 * It coordinates sending instructions to the other clients and performs
 * broadcasts via the server when a game event happens
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-hosted',
  templateUrl: 'game-hosted.html',
})
export class GameHostedPage {

    gameId = '';
    user = '';
    host = false;
    message = '';
    textBanner = 'Waiting for Players';
    players = [];

    motionController = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController, private deviceMotion: DeviceMotion) {

        this.gameId = this.navParams.get('gameId');
        this.user = this.navParams.get('user');
        this.host = this.navParams.get('host');

        this.playerMoved().subscribe(data => {
            console.log('player out' + data['user']);
        });

        this.getUsers().subscribe(data => {
            let user = data['user'];
            this.players.push(user);
            this.showToast('User joined: ' + user);
            if (data['event'] === 'left') {
                this.showToast('User left: ' + user);
            } else {

            }
            console.log(data);
        });

 //       this.motionController = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
  //          console.log(acceleration);
   //     });

    }

    startGame() {
        this.socket.emit('start-game', { room: this.gameId });
    }

    playerMoved() {
        let observable = new Observable(observer => {
            this.socket.on('player-out', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }


    getUsers() {
        let observable = new Observable(observer => {
            this.socket.on('player-joined', (data) => {
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
