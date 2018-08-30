import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateReportPage } from './create-report';

@NgModule({
  declarations: [
    CreateReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateReportPage),
  ],
})
export class CreateReportPageModule {}
