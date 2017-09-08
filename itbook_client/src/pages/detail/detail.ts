import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItbookService } from '../../providers/itbook-service/itbook-service';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  bookID: string = this.navParams.data.id;
  bookDetail = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bookService: ItbookService
  ) {
    this.getBookDetailFromQueryBook(this.bookID);
  }

  getBookDetailFromQueryBook(bookID) {
    return new Promise((resolve, reject) => {
      console.log(this.navParams.data);
      this.bookService.getBookDetail(bookID).subscribe(data => {
        console.log(this.bookDetail = data);
        return (this.bookDetail = data);
      });
      resolve();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
}
