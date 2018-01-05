import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameMenuPage } from './game-menu';

@NgModule({
  declarations: [
    GameMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(GameMenuPage),
  ],
})
export class GameMenuPageModule {}
