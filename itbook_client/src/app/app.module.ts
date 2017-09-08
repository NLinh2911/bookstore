import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItbookService } from '../providers/itbook-service/itbook-service';
import { DetailPage } from '../pages/detail/detail';
import { ListPage } from '../pages/list/list';
import { ExampleComponent } from '../components/example/example';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    ListPage,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    ListPage,
    ExampleComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItbookService
  ]
})
export class AppModule {}
