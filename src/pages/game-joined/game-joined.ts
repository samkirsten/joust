import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

/**
 * Class for the GameJoinedPage page. Handles the game play for a client, and
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-game-joined',
    templateUrl: 'game-joined.html',
})
export class GameJoinedPage {

    messages = [];
    gameId = '';
    user = '';
    host = false;
    status = 'Ready to Play';

    motionController = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController, private deviceMotion: DeviceMotion) {

        this.gameId = this.navParams.get('gameId');
        this.user = this.navParams.get('user');
        this.host = this.navParams.get('host');

        this.startGame().subscribe(message => {
            this.messages.push("game started");
            this.startCountdown();
        });

        this.endGame().subscribe(message => {
            this.messages.push("game ended");
        });

        // Get the device current acceleration
        //this.deviceMotion.getCurrentAcceleration().then(
        //    (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
        //    (error: any) => console.log(error)
        //);

        // Watch device acceleration
        this.motionController = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
            console.log(acceleration);
        });

        // Stop watch
        //subscription.unsubscribe();

    }

    startGame() {
        //this.motionController = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        //    console.log(acceleration);
        //});
        let observable = new Observable(observer => {
            this.socket.on('game-started', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    endGame() {
        let observable = new Observable(observer => {
            this.socket.on('game-over', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    startCountdown() {
        let time = 5;
        var me = this;
        let timer = setInterval(function(){
            time--;
            me.status = time.toString();
            if(time <= 0) {
                clearInterval(timer);
                me.gameStarted();
            }
        },1000);
    }

    gameStarted() {
        this.status = 'Game Started'
    }

    playerMoved() {
        this.socket.emit('user-moved', { room: this.gameId, user: this.user });
        this.status = "game over";
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
