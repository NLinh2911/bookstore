import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
