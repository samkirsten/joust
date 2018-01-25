webpackJsonp([0],{

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameJoinedPageModule", function() { return GameJoinedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_joined__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GameJoinedPageModule = (function () {
    function GameJoinedPageModule() {
    }
    GameJoinedPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__game_joined__["a" /* GameJoinedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__game_joined__["a" /* GameJoinedPage */]),
            ],
        })
    ], GameJoinedPageModule);
    return GameJoinedPageModule;
}());

//# sourceMappingURL=game-joined.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameJoinedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device_motion__ = __webpack_require__(226);
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
 * Class for the GameJoinedPage page. Handles the game play for a client, and
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GameJoinedPage = (function () {
    function GameJoinedPage(navCtrl, navParams, socket, toastCtrl, deviceMotion) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.deviceMotion = deviceMotion;
        this.messages = [];
        this.gameId = '';
        this.user = '';
        this.host = false;
        this.message = '';
        this.motionController = null;
        this.gameId = this.navParams.get('gameId');
        this.user = this.navParams.get('user');
        this.host = this.navParams.get('host');
        this.startGame().subscribe(function (message) {
            _this.messages.push("game started");
        });
        this.endGame().subscribe(function (message) {
            _this.messages.push("game ended");
        });
        // Get the device current acceleration
        //this.deviceMotion.getCurrentAcceleration().then(
        //    (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
        //    (error: any) => console.log(error)
        //);
        // Watch device acceleration
        this.motionController = this.deviceMotion.watchAcceleration().subscribe(function (acceleration) {
            console.log(acceleration);
        });
        // Stop watch
        //subscription.unsubscribe();
    }
    GameJoinedPage.prototype.startGame = function () {
        var _this = this;
        //this.motionController = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        //    console.log(acceleration);
        //});
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('game-started', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    GameJoinedPage.prototype.endGame = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('game-over', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    GameJoinedPage.prototype.playerMoved = function () {
        this.socket.emit('user-moved', { room: this.gameId, user: this.user });
    };
    GameJoinedPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    GameJoinedPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    };
    GameJoinedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-game-joined',template:/*ion-inline-start:"/Users/samkirsten/Projects/joust/src/pages/game-joined/game-joined.html"*/'<!--\n  Generated template for the GameJoinedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>gameJoined</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/samkirsten/Projects/joust/src/pages/game-joined/game-joined.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device_motion__["a" /* DeviceMotion */]])
    ], GameJoinedPage);
    return GameJoinedPage;
}());

//# sourceMappingURL=game-joined.js.map

/***/ })

});
//# sourceMappingURL=0.js.map