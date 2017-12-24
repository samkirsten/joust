import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostGamePage } from './host-game';

@NgModule({
  declarations: [
    HostGamePage,
  ],
  imports: [
    IonicPageModule.forChild(HostGamePage),
  ],
})
export class HostGamePageModule {}
