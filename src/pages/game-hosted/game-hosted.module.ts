import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameHostedPage } from './game-hosted';

@NgModule({
  declarations: [
    GameHostedPage,
  ],
  imports: [
    IonicPageModule.forChild(GameHostedPage),
  ],
})
export class GameHostedPageModule {}
