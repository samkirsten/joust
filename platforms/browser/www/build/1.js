webpackJsonp([1],{

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameHostedPageModule", function() { return GameHostedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_hosted__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GameHostedPageModule = (function () {
    function GameHostedPageModule() {
    }
    GameHostedPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__game_hosted__["a" /* GameHostedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__game_hosted__["a" /* GameHostedPage */]),
            ],
        })
    ], GameHostedPageModule);
    return GameHostedPageModule;
}());

//# sourceMappingURL=game-hosted.module.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameHostedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device_motion__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Class for the GameHostedPage page. This handles the game play when a game has been hosted.
 * It coordinates sending instructions to the other clients and performs
 * broadcasts via the server when a game event happens
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GameHostedPage = (function () {
    function GameHostedPage(navCtrl, navParams, socket, toastCtrl, deviceMotion) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.deviceMotion = deviceMotion;
        this.gameId = '';
        this.user = '';
        this.host = false;
        this.message = '';
        this.textBanner = 'Waiting for Players';
        this.players = [];
        this.motionController = null;
        this.gameId = this.navParams.get('gameId');
        this.user = this.navParams.get('user');
        this.host = this.navParams.get('host');
        this.playerMoved().subscribe(function (data) {
            console.log('player out' + data['user']);
        });
        this.getUsers().subscribe(function (data) {
            var user = data;
            console.log(data);
            _this.players.push(user);
            _this.showToast('User joined: ' + user);
            if (data['event'] === 'left') {
                _this.showToast('User left: ' + user);
            }
            else {
            }
            console.log(_this.players);
        });
        //       this.motionController = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        //          console.log(acceleration);
        //     });
    }
    GameHostedPage.prototype.startGame = function () {
        this.socket.emit('start-game', { room: this.gameId });
    };
    GameHostedPage.prototype.playerMoved = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('player-out', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    GameHostedPage.prototype.getUsers = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('player-joined', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    GameHostedPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    GameHostedPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    };
    GameHostedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-game-hosted',template:/*ion-inline-start:"/Users/samkirsten/Projects/joust/src/pages/game-hosted/game-hosted.html"*/'<!--\n  Generated template for the GameHostedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Hosting: {{gameId}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n <h1>{{textBanner}}</h1>\n    <ion-list>\n            <ion-item *ngFor="let player of players">{{player}}</ion-item>\n    </ion-list>\n    <button (click)="startGame()" ion-button block color="secondary">Start Game</button>\n</ion-content>\n'/*ion-inline-end:"/Users/samkirsten/Projects/joust/src/pages/game-hosted/game-hosted.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device_motion__["a" /* DeviceMotion */]])
    ], GameHostedPage);
    return GameHostedPage;
}());

//# sourceMappingURL=game-hosted.js.map

/***/ })

});
//# sourceMappingURL=1.js.map