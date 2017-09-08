webpackJsonp([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_itbook_service_itbook_service__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ListPage = (function () {
    function ListPage(navCtrl, navParams, bookService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bookService = bookService;
        this.cateID = this.navParams.data.id;
        this.books = [];
        this.getBookByCategoryID(this.cateID);
    }
    ListPage.prototype.getBookByCategoryID = function (cateID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.bookService
                .getBookItemsByCateID(cateID)
                .subscribe(function (data) {
                console.log(data);
                _this.books = data;
            });
        });
    };
    ListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListPage');
    };
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      List Page\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list *ngIf="books">\n    <ion-item *ngFor="let b of books">\n      <ion-thumbnail item-start>\n        <img class="image-style" src="http://localhost:3000/images/Redmine-Cookbook.jpg" />\n      </ion-thumbnail>\n      <h2 class="book-title">{{b.title}}</h2>\n      <p class="book-author">{{b.author}}</p>\n      <button ion-button clear item-end (click)="toDetailPage(b.id)" [value]="b.id">View</button>\n    </ion-item>\n  </ion-list>\n  <example></example>\n</ion-content>\n'/*ion-inline-end:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_itbook_service_itbook_service__["a" /* ItbookService */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detail/detail.module": [
		271,
		1
	],
	"../pages/list/list.module": [
		272,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_itbook_service_itbook_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { ListPage } from '../list/list';

var HomePage = (function () {
    function HomePage(navCtrl, bookService) {
        this.navCtrl = navCtrl;
        this.bookService = bookService;
        this.books = [];
        this.start = 0;
        this.getBookFromQueryBook(this.start);
    }
    HomePage.prototype.getBookFromQueryBook = function (limitNum) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.bookService.getBookItems(limitNum)
                .subscribe(function (data) {
                console.log(data);
                data.forEach(function (item) {
                    _this.books.push(item);
                });
                resolve();
            });
        });
    };
    // keep doing infiniteScroll even out of data...
    HomePage.prototype.doInfinite = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("Begin infinite scroll.");
            _this.start += 10;
            _this.getBookFromQueryBook(_this.start).then(function () {
                // infiniteScroll.complete();
                console.log("End Infinite Scroll.");
                resolve();
            });
        });
    };
    HomePage.prototype.toDetailPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], { id: id });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button [menuToggle]="activeMenu">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Book Store\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list *ngIf="books">\n    <ion-item *ngFor="let b of books">\n      <ion-thumbnail item-start>\n        <img class="image-style" src="http://localhost:3000/images/Redmine-Cookbook.jpg" />\n      </ion-thumbnail>\n      <h2 class="book-title">{{b.title}}</h2>\n      <p class="book-author">{{b.author}}</p>\n      <button ion-button clear item-end (click)="toDetailPage(b.id)" [value]="b.id">View</button>\n    </ion-item>\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_itbook_service_itbook_service__["a" /* ItbookService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExampleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ExampleComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var ExampleComponent = (function () {
    function ExampleComponent() {
        console.log('Hello ExampleComponent Component');
        this.text = 'Hello World';
    }
    return ExampleComponent;
}());
ExampleComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'example',template:/*ion-inline-start:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/components/example/example.html"*/'<!-- Generated template for the ExampleComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/components/example/example.html"*/
    }),
    __metadata("design:paramtypes", [])
], ExampleComponent);

//# sourceMappingURL=example.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(217);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_itbook_service_itbook_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_list_list__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_example_example__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__["a" /* DetailPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_11__components_example_example__["a" /* ExampleComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list/list.module#ListPageModule', name: 'ListPage', segment: 'list', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_detail_detail__["a" /* DetailPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_11__components_example_example__["a" /* ExampleComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_8__providers_itbook_service_itbook_service__["a" /* ItbookService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_itbook_service_itbook_service__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, bookService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.bookService = bookService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.categoriesList = [];
        this.initApp();
        this.getCategories();
    }
    MyApp.prototype.initApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.getCategories = function () {
        var _this = this;
        this.bookService
            .getBookCategories()
            .subscribe(function (data) { return (_this.categoriesList = data); });
    };
    MyApp.prototype.toListPage = function (id) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */], { id: id });
        // this.categoriesList = [];
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Category</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <!-- <ion-list *ngIf="categoriesList">\n      <button menuClose ion-item *ngFor="let c of categoriesList">\n          {{c.name}}\n      </button>\n      \n      add menuClose to auto close menu item after clicking\n    </ion-list> -->\n\n    <ion-item-group *ngIf="categoriesList">\n      <div *ngFor="let c of categoriesList">\n        <button menuClose color="primary" ion-button full (click)="toListPage(c.name)">{{c.name}}</button>\n        <button menuClose ion-item *ngFor="let cc of c.array" (click)="toListPage(cc.name)">{{cc.name}}</button>\n      </div>\n    </ion-item-group>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__providers_itbook_service_itbook_service__["a" /* ItbookService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItbookService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the ItbookServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ItbookService = (function () {
    function ItbookService(http) {
        this.http = http;
        this.urlApiCategories = 'http://localhost:3000/api/categories';
        this.urlApiBooks = 'http://localhost:3000/api/books';
        this.urlApiBookDetail = 'http://localhost:3000/api/book-detail';
        this.urlApiBooksByCateID = 'http://localhost:3000/api/books-by-cateid';
        this.fetchNum = 10;
        console.log('Hello ItbookServiceProvider Provider');
    }
    ItbookService.prototype.getBookItems = function (offsetNum) {
        return this.http
            .get(this.urlApiBooks + "?filter[offsetNum]=" + offsetNum + "&filter[fetchNum]=" + this.fetchNum)
            .map(this.extractData)
            .catch(this.catchErr);
    };
    // .do((res: Response) => console.log(res))
    ItbookService.prototype.getBookCategories = function () {
        return this.http
            .get(this.urlApiCategories)
            .map(this.extractData)
            .catch(this.catchErr);
    };
    ItbookService.prototype.getBookItemsByCateID = function (cateID) {
        return this.http
            .get(this.urlApiBooksByCateID + "/" + cateID)
            .map(this.extractData)
            .catch(this.catchErr);
    };
    ItbookService.prototype.getBookDetail = function (bookID) {
        return this.http
            .get(this.urlApiBookDetail + "?bookDetail[bookID]=" + bookID)
            .map(this.extractData)
            .catch(this.catchErr);
    };
    ItbookService.prototype.catchErr = function (err) {
        console.log(err);
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(err.json || 'Server error.');
    };
    ItbookService.prototype.extractData = function (res) {
        return res.json();
    };
    return ItbookService;
}());
ItbookService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ItbookService);

//# sourceMappingURL=itbook-service.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_itbook_service_itbook_service__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DetailPage = (function () {
    function DetailPage(navCtrl, navParams, bookService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bookService = bookService;
        this.bookID = this.navParams.data.id;
        this.bookDetail = [];
        this.getBookDetailFromQueryBook(this.bookID);
    }
    DetailPage.prototype.getBookDetailFromQueryBook = function (bookID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(_this.navParams.data);
            _this.bookService.getBookDetail(bookID).subscribe(function (data) {
                console.log(_this.bookDetail = data);
                return (_this.bookDetail = data);
            });
            resolve();
        });
    };
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    return DetailPage;
}());
DetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-detail',template:/*ion-inline-start:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/pages/detail/detail.html"*/'<!--\n  Generated template for the DetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Book Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list *ngIf="bookDetail">\n\n    <div *ngFor="let bd of bookDetail">\n\n      <ion-item>\n        <ion-grid>\n          <ion-row>\n            <h2 class="title">{{bd.title}}</h2>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n\n      <ion-item>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-4>\n              <img src="http://www.allitebooks.com/wp-content/uploads/2017/09/Practical-LXC-and-LXD.jpg">\n            </ion-col>\n            <ion-col col-4>\n              <ion-row>\n                <span class="atri-name">Author:</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">ISBN-10</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">Year:</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">Pages:</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">Language:</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">File Size:</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">File Format:</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-name">Category:</span>\n              </ion-row>\n            </ion-col>\n\n            <ion-col col-4>\n              <ion-row>\n                <span class="atri-val">{{bd.author}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.isbn_10}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.year}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.page}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.language}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.file_size}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.file_format}}</span>\n              </ion-row>\n              <ion-row>\n                <span class="atri-val">{{bd.category}}</span>\n              </ion-row>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n\n      <ion-item>\n        <ion-grid>\n          <ion-row>\n            <p class="book-des">\n              {{bd.description}}\n            </p>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/phanquan/Desktop/ITBookProjectWithIonic/itbook_client/src/pages/detail/detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_itbook_service_itbook_service__["a" /* ItbookService */]])
], DetailPage);

//# sourceMappingURL=detail.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map