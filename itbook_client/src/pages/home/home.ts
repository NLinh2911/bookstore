import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItbookService } from '../../providers/itbook-service/itbook-service';
// import { ListPage } from '../list/list';
import { DetailPage } from '../detail/detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books = [];
  private start: number = 0;

  constructor(
    public navCtrl: NavController,
    private bookService: ItbookService
  ) {
    this.getBookFromQueryBook(this.start);
  }

  getBookFromQueryBook(limitNum: number) {
    return new Promise((resolve, reject) => {
      this.bookService.getBookItems(limitNum)
        .subscribe(data => {
          console.log(data);
          data.forEach(item => {
            this.books.push(item);
          });
          resolve();
        });
    });
  }

  // keep doing infiniteScroll even out of data...
  doInfinite(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`Begin infinite scroll.`);
      this.start += 10;
      this.getBookFromQueryBook(this.start).then(() => {
        // infiniteScroll.complete();
        console.log(`End Infinite Scroll.`);
        resolve();
      });
    });
  }

  toDetailPage(id) {
    this.navCtrl.push(DetailPage, { id: id });
  }
}
