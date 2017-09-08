import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ItbookService } from '../providers/itbook-service/itbook-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: any;

  rootPage: any = HomePage;

  categoriesList = [];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private bookService: ItbookService
  ) {
    this.initApp();
    this.getCategories();
  }

  initApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getCategories() {
    this.bookService
      .getBookCategories()
      .subscribe(data => (this.categoriesList = data));
  }

  toListPage(id) {
    this.nav.push(ListPage, { id: id });
    // this.categoriesList = [];
  }
}
