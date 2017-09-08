import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItbookService } from '../../providers/itbook-service/itbook-service';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private cateID = this.navParams.data.id;
  books = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bookService: ItbookService
  ) {
    this.getBookByCategoryID(this.cateID);
  }

  getBookByCategoryID(cateID) {
    return new Promise((resolve, reject) => {
      this.bookService
        .getBookItemsByCateID(cateID)
        .subscribe(data => {
          console.log(data);
          this.books = data;
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
}
