import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ItbookServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItbookService {
  private urlApiCategories: string = 'http://localhost:3000/api/categories';
  private urlApiBooks: string = 'http://localhost:3000/api/books';
  private urlApiBookDetail: string = 'http://localhost:3000/api/book-detail';
  private urlApiBooksByCateID: string = 'http://localhost:3000/api/books-by-cateid';
  fetchNum:number = 10;

  constructor(private http: Http) {
    console.log('Hello ItbookServiceProvider Provider');
  }

  getBookItems(offsetNum: number) {
    return this.http
      .get(`${this.urlApiBooks}?filter[offsetNum]=${offsetNum}&filter[fetchNum]=${this.fetchNum}`)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  // .do((res: Response) => console.log(res))
  getBookCategories() {
    return this.http
      .get(this.urlApiCategories)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  getBookItemsByCateID(cateID:string) {
    return this.http
      .get(`${this.urlApiBooksByCateID}/${cateID}`)
      .map(this.extractData)
      .catch(this.catchErr)
  }

  getBookDetail(bookID:string) {
    return this.http
      .get(`${this.urlApiBookDetail}?bookDetail[bookID]=${bookID}`)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  private catchErr(err: Response | any) {
    console.log(err);
    return Observable.throw(err.json || 'Server error.');
  }

  private extractData(res: Response) {
    return res.json();
  }
}
