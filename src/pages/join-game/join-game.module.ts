import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinGamePage } from './join-game';

@NgModule({
  declarations: [
    JoinGamePage,
  ],
  imports: [
    IonicPageModule.forChild(JoinGamePage),
  ],
})
export class JoinGamePageModule {}
