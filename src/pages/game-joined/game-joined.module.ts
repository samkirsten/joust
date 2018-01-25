import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameJoinedPage } from './game-joined';

@NgModule({
  declarations: [
    GameJoinedPage,
  ],
  imports: [
    IonicPageModule.forChild(GameJoinedPage),
  ],
})
export class GameJoinedPageModule {}
