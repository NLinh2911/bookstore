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
  // private url: string = '127.0.0.1:3000';
  private url: string = 'localhost:3000';
  private apiCategories: string = 'api/categories';
  private apiBooks: string = 'api/books';
  private apiBookDetail: string = 'api/book';
  private apiBooksByCateName: string = 'api/books-by-cate';
  private apiBooksBySearch: string = 'api/search';
  fetchNum: number = 10;

  constructor(private http: Http) {
    console.log('Hello ItbookServiceProvider Provider');
  }

  getBookItems(offsetNum: number) {
    return this.http
      .get(`
        ${this.url}/${this.apiBooks}?filter[offsetNum]=${offsetNum}&filter[fetchNum]=${this.fetchNum}
      `)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  // .do((res: Response) => console.log(res))
  getBookCategories() {
    return this.http
      .get(`${this.url}/${this.apiCategories}`)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  getBookItemsByCateName(cateID: string) {
    return this.http
      .get(`${this.url}/${this.apiBooksByCateName}/${cateID}`)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  getBookDetail(bookID: string) {
    return this.http
      .get(`${this.url}/${this.apiBookDetail}/${bookID}`)
      .map(this.extractData)
      .catch(this.catchErr);
  }

  getBookItemsBySearch(strQuery: string) {
    return this.http
      .get(`${this.url}/${this.apiBooksBySearch}/${strQuery}`)
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
