import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { JoinGamePage } from "../pages/join-game/join-game";
import { HostGamePage } from "../pages/host-game/host-game";
import { GamePageModule } from "../pages/game/game.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import {JoinGamePageModule} from "../pages/join-game/join-game.module";
import {HostGamePageModule} from "../pages/host-game/host-game.module";
import {GameMenuPageModule} from "../pages/game-menu/game-menu.module";
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      SocketIoModule.forRoot(config),
      HostGamePageModule,
      JoinGamePageModule,
      GameMenuPageModule,
      GamePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
