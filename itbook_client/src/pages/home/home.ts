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
  private books = [];
  private start: number = 0;
  private searchQuery: string;
  private bool: boolean = true; // true for homepage
  private title: string;

  constructor(
    public navCtrl: NavController,
    private bookService: ItbookService
  ) {
    this.getBookFromQueryBook(this.start);
  }

  currentPage(bool: boolean) {
    return (this.title = true ? 'IT Book Store' : 'List Book');
  }

  getBookFromQueryBook(limitNum: number) {
    return new Promise((resolve, reject) => {
      if (this.bool) {
        this.books = [];
        this.bookService
          .getBookItems(limitNum)
          .subscribe(data => {
            console.log(data);
            data.forEach(item => {
              this.books.push(item);
            });
            resolve();
          });
      } else {
        this.books = [];
        this.bookService
          .getBookItemsBySearch(this.searchQuery)
          .subscribe(data => {
            console.log(data);
            data.forEach(item => {
              this.books.push(item);
            });
            resolve();
          });
      }
    });
  }

  // keep doing infiniteScroll even out of data...
  doInfinite(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`Begin infinite scroll.`);
      this.start += 10;
      this.getBookFromQueryBook(this.start)
        .then(() => {
          console.log(`End Infinite Scroll.`);
          resolve();
        })
        .catch(err => console.log(err));
    });
  }

  getItems(e: any) {
    this.searchQuery = e.target.value;
    this.bool = false;
    this.start = 0;    
    this.getBookFromQueryBook(this.start);
  }

  toDetailPage(id) {
    this.navCtrl.push(DetailPage, { id: id });
  }
}
