# Bookstore web application

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Cài đặt](#cài-đặt)
- [Tài liệu hướng dẫn](#tài-liệu-hướng-dẫn)
	- [Server side](#server-side)
		- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
		- [Cấu hình server](#cấu-hình-server)
		- [Models](#models)
		- [Routes](#routes)
	- [Client side (Nunjucks)](#client-side-nunjucks)
		- [Layout](#layout)
		- [Navigation, Search component](#navigation-search-component)
		- [Categories component](#categories-component)
		- [Index, Detail, Author component](#index-detail-author-component)
		- [Pagination](#pagination)

## Giới thiệu
Bookstore (ứng dụng đọc sách online) được xây dựng theo phong cách **Monolithic applications** (*kiến trúc hệ thống một khối*) dựa trên nền tảng thiết kế MVC design pattern, với các công nghệ được áp dụng như:
- [Node.js (server)](https://nodejs.org)
- [Express (middleware)](https:http://expressjs.com/)
- [Nunjucks (template engine)](https://mozilla.github.io/nunjucks/)
- [Postgres (database)](https://postgresql.org)
- [Nightmare (crawling data)](http://nightmarejs.org/)

## Cài đặt
1. Open terminal và clone repository về máy bằng câu lệnh:
    ```bash
    $ git clone https://github.com/NLinh2911/bookstore
    ```

2. Cài đặt node_modules:
    ```bash
    $ cd bookstore
    $ npm install
    ```
3. Khởi tạo và cấu hình database:
    - Tạo 1 database trong postgres server có tên là: **itbook2**
    - Mở file `config.json` trong folder `config`
        ```json
        "development": {
            "username": "postgres",
            "password": "secretpassword",
            "database": "itbook2",
            "host": "localhost",
            "port": 5432,
            "dialect": "postgres",
            "schema": "public",
            "logging": false
        }
        ```
        - Thay đổi mật khẩu tại dòng  `password` trùng với mật khẩu postgres trên máy mình
        - Kiểm tra và cấu hình `port` trên máy mình cho giống với port trên file `config.json`
4. Tạo bảng và chèn dữ liệu:
    - Tạo các bảng mới, thêm cột và chèn dữ liệu cho CSDL bằng các câu lệnh trên **Terminal** theo thứ tự:
        ```bash
        $ cd crawl-data
        $ node create-table.js
        $ node insert-category.js
        $ node insert-book.js
        $ cd ..
        ```
5. Chạy ứng dụng:
    ```
    $ npm start
    ```
Ứng dụng chạy trên port 3000 nên mở trình duyệt và nhập đường dẫn:
>localhost:3000

## Tài liệu hướng dẫn
### Server side
#### Cấu trúc thư mục
- `/bin`: folder chứa file khởi tạo ứng dụng www, dùng để khởi tạo ứng dụng khi chạy lệnh `npm start`.
- `/config`: chứa file `config.json` định nghĩa các thông số cấu hình cho database.
- `/crawl_data`: chứa các file dữ liệu đã được cào từ các nguồn có sẵn (trong folder `json_data`) và các file khởi tạo bảng cũng như thêm dữ liệu từ folder `json_data` cho các bảng trong database.
- `/node_modules`: chứa core framework và các thư viện khác.
- `/public`: chứa các file css, fs và images.
- `/routes`: định nghĩa url và method.
- `/view`: thư mục chứa các file layout front-end dùng để render dữ liệu, hình ảnh ra browser.
- `app.js`: file kết nối tất cả mọi thứ với nhau để ứng dụng có thể chạy được chính xác.
- `pgp.js`: file cấu hình cho database sử dụng thông số từ `/config/config.json` để kết nối database tới ứng dụng.
#### Cấu hình server
- bin/www
    - Gọi các file module và file `app.js` để chạy
        ```js
        var app = require('../app');
        var debug = require('debug')('itbooks:server');
        var http = require('http');
        ```
    - Khởi tạo port và lưu trữ vào express
        ```js
        var port = normalizePort(process.env.PORT || '3000');
        app.set('port', port);
        ```
    - Tạo HTTP server
        ```js
        var server = http.createServer(app);
        ```
    - Cho server "lắng nghe" port đã được cung cấp trước đó cũng như hứng các sự kiện quan trọng để trả về kết quả
        ```js
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
        ```
    - Chuẩn hoá các cổng để không bị dính lỗi kí tự
        ```js
        function normalizePort(val) {
            var port = parseInt(val, 10);

            if (isNaN(port)) {
                // named pipe
                return val;
            }

            if (port >= 0) {
                // port number
                return port;
            }

            return false;
        }
        ```
    - Tạo function cho sự kiện **error** để in ra kết quả thông báo khi có lỗi xảy ra
        ```js
        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
        ```
    - Tạo function cho sự kiện **listening** khi server đã kết nối được đến cổng
        ```js
        function onListening() {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            debug('Listening on ' + bind);
        }
        ```
- app.js
Đây là file quan trọng để kết nối mọi thứ với nhau nên ở đây sẽ là nơi gọi các module cần thiết
    - Khởi tạo Express middleware và gắn nó vào biến app
        ```js
        const express = require("express");
        const app = express()
        ```
    - Gọi vào **body-parser** để Nodejs có thể xử lý các JSON file và mã hóa URL
        ```js
        const bodyParser = require('body-parser')
        const urlencodedParser = bodyParser.urlencoded({ extended: false })
        ```
    - Gọi file `pgp` và định danh nó để sử dụng các dữ liệu trong database
        ```js
        const db = require('./pgp')
        ```
    - Cấu hình *template engine* (Nunjucks)
        ```js
        const nunjucks = require('nunjucks')
        nunjucks.configure('views', {
            autoescape: true,
            express: app
        })
        ```
    - Cài đặt *view engine* để sử dụng file Nunjucks(.njk) và cấu hình cho folder `views` để chứa các file layout
        ```js
        app.set('views', './views')
        app.set('view engine', 'njk')
        ```
    - Dùng `express.static` làm trung gian để sử dụng các file tĩnh (file ảnh, css, js) và truyền vào tên thư mục để làm nơi lưu trữ các file đó
        ```js
        app.use(express.static(__dirname + '/public'))
        ```
    - Khai báo các route được cấu hình trong folder `routes` để sử dụng cho các đường dẫn riêng biệt
        ```js
        const index = require('./routes/index')
        const detail = require('./routes/detail')
        const category = require('./routes/category')
        const author = require('./routes/author')
        const api = require('./routes/api')

        app.use('/', index)
        app.use('/categories', category)
        app.use('/books', detail)
        app.use('/authors', author)
        app.use('/api/v1', api)
        ```
#### Models
Folder gồm 2 file `book.js` và `category.js` lấy dữ liệu từ database theo đúng chức năng riêng biệt của mỗi file dùng để xuất dữ liệu cho tầng **View**   

- **book.js** bao gồm các function như:
    - `getBookNums`: sử dụng cho việc phân trang để hiển thị các đầu sách
        ```js
        getBookNums : () =>{
            return db.one("SELECT COUNT(id) FROM book")
        }
        ```
    - `getBookLimit`: số lượng book hiển thị trên 1 trang
        ```js
        getBookLimit: (limit, offset) =>{
            return db.many("SELECT * FROM book LIMIT $1 OFFSET $2", [limit, offset])
        }
        ```
    - `getNumsBookByCategory`: tổng số sách trong 1 danh mục
        ```js
        getNumsBookByCategory: (kind) => {
            return db.one("SELECT COUNT(id) FROM book WHERE top_category ILIKE $1", kind) 
        }
        ```
    - `getBookByTopCategory`: hiển thị danh sách các book trong 1 danh mục sách chính
        ```js
        getBookByTopCategory: (category, limit, offset) => {
            return db.any("SELECT * FROM book WHERE top_category ILIKE $1 LIMIT $2 OFFSET $3", [category, limit, offset]);
        }
        ```
    - `getBookBySubCategory`: hiển thị danh sách các book trong 1 danh mục sách con
        ```js
        getBookBySubCategory: (category) => {
            return db.any("SELECT * FROM book WHERE $1 ILIKE ANY (category)", category);
        }
        ```
    - `getBookByAuthor`: liệt kê các đầu sách của một(hoặc nhiều) tác giả
        ```js
        getBookByAuthor: (author)=>{
            return db.any("SELECT * FROM book WHERE $1 ILIKE ANY (author)", author);
        }
        ```
    - `getSingleBook`: trình bày nội dung chi tiết của 1 tựa sách 
        ```js
        getSingleBook: (title) => {
            return db.oneOrNone("SELECT * FROM book WHERE title ILIKE $1", title);
        }
        ```
    - `searchBook`: dùng để tìm kiếm tên sách trên khung tìm kiếm
        ```js
        searchBook: (text)=>{
            return db.any("SELECT * FROM book WHERE document @@ plainto_tsquery($1)", text)
        }
        ```
- **category.js**
    - `getAllCategory`: lấy ra tất cả danh sách danh mục
        ```js
        getAllCategory: () => {
            return db.many(`SELECT * FROM category`)
        }
        ```
    - `getTopCategory`: xuất ra danh sách danh mục chính
        ```js
        getTopCategory: () => {
            return db.any(`SELECT name, id FROM category WHERE parent_id IS NULL`)
        }
        ```
    - `getSubCategory`: danh sách danh mục con
        ```js
        getSubCategory: (parent_id) => {
            return db.any(`SELECT name FROM category WHERE parent_id = $1`, parent_id)
        }
        ```
    - `getCategory`: lọc danh sách bằng *raw_to_json* để lấy ra được danh sách các danh mục chính và các danh mục con của từng danh mục chính
        ```js
        getCategory: () => {
            return db.any(`
                SELECT c.id, c.name,
                (array(
                SELECT row_to_json(cc) 
                FROM category AS cc
                WHERE cc.parent_id = c.id)
                ) AS category
                FROM category as c WHERE parent_id IS Null
            `)
        }
        ```
### Routes
#### Chia ra làm 2 phần :  
- Phần 1 
    - `api.js`: route này dùng để làm route API dữ liệu cho các ứng dụng khác ( bookstore viết bằng Vue.js template )
- Phần 2
    - `index.js`, `category.js`, `detail.js`, `author.js`, `search.js`: các route lấy dữ liệu từ folder `Models` và render ra các trang layout sử dụng cho server **Express** và template **Nunjucks**

#### Chi tiết từng phần:
- Phần 1:
- Phần 2:
    - `index.js`: file render trang chủ, xuất ra tất cả các đầu sách ở mọi category và chia thành 10 cuốn cho mỗi mục phân trang (10 books/pagination) kèm theo đó là danh sách các danh mục sách.
        - Lấy danh sách các category chính và các tựa sách:
        ```js
        const category = require('../models/category')
        const books = require('../models/book')
        ```
        - Xuất dữ liệu ra trang chủ
        ```js
        // Tạo route trang chủ
        router.get('/', async (req, res, next)=>{
            // Phân trang, hiển thị số lượng sách trên 1 trang và số trang hiện tại người dùng đang chọn
            let pages_num = req.query.page || 1;
            let book_quantity = await books.getBookNums()
            let offset = 10 * (pages_num - 1);
            let pages = Math.ceil(parseInt(book_quantity.count)/10)
            let currentPage = parseInt(pages_num)

            // Lấy dữ liệu sách và danh mụch sách từ Models
            let getCategory = await category.getCategory()
            let getBook = await books.getBookLimit(10, offset)


            // Render dữ liệu vào trang index.njk
            res.render('index',{
                title: 'IT Book Store',
                books : getBook,
                paginate : true,
                currentPage,
                root : '',
                getCategory,
                pages
            });
        });
        ```

    - `category.js`:
        - Route Category, show tất các đầu sách của danh mục chính
        ```js
        // Param router được lấy theo tên mỗi danh mục chính
        router.get('/:topCategory', async function (req, res, next) {
            // Filter tên danh mục chính, thay thế các khoảng trống giữa các kí tự thành dấu '-'
            let topCategory = req.params.topCategory.replace(/-/gi, ' ')

            // Phân trang, chia dữ liệu cho mỗi trang (7 books/ pagination)
            let pages_num = req.query.page || 1
            let book_quantity = await books.getNumsBookByCategory(topCategory)
            let offset = 7 * (pages_num - 1)
            let pages = Math.ceil(parseInt(book_quantity.count)/7)

            //Cấu hình đường dẫn
            let root = req.params.topCategory;
            if(req.query.page || req.url.slice(-1)=='/'){
                root = '../' + req.params.topCategory
            }

            //Lấy dữ liệu book, category từ folder Models
            let getCategory = await category.getCategory()
            let getBook = await books.getBookByTopCategory(topCategory, 7, offset)

            //Render dữ liệu vào trang index.njk
            res.render('index', {
                title: 'IT Book Store',
                books: getBook,
                paginate : true,
                root : root,
                getCategory,
                pages
            })
        })
        ```
        - Route subCategory, các đầu sách của danh mục con
        ```js
        //Cấu hình đường dẫn theo quy tắc /tên-danh-mục-chính/tên-danh-mục-con
        router.get('/:topCategory/:subCategory', async function (req, res, next) {
            try {
                // Filter các kí tự khoảng cách giữa các tên thành dấu '-' cho các đưỡng dẫn URL
                let topCategory = req.params.topCategory.replace(/-/gi, ' ')
                let subCategory = req.params.subCategory.replace(/-/gi, ' ')

                //Lấy dữ liệu cho danh mục chính và danh mục con
                let getCategory = await category.getCategory()
                let getBookBySubCategory = await books.getBookBySubCategory(subCategory)

                //Render vào index.njk
                res.render('index', {
                    title: 'IT Book Store',
                    books: getBookBySubCategory,
                    getCategory
                })
            } catch (err) {
            //Bắt lỗi và hiển trị trên terminal nếu có
            console.log(err)
            }
        })
        ```
    - `detail.js`:
        - Tạo route nội dung chi tiết cho mỗi sách người dùng click vào:
        ```js
        // Params dữ liệu động lấy theo tên mỗi đầu sách
        router.get('/:name', async function (req, res, next) {
            try {
                // Filter khoảng cách giữa các kí tự trong tên sách thành dấu '-'
                let name = req.params.name.replace(/-/gi, ' ')

                // Lấy dữ liệu cho danh mục chính và sách theo tên tác giả
                let getCategory = await category.getCategory()
                let getBookByAuthor = await books.getBookByAuthor(name)

                // Render dữ liệu vào index.njk
                res.render('index', {
                    title: 'IT Book Store',
                    books: getBookByAuthor,
                    paginate : false,
                    getCategory
                })
            } catch (err) {
                // Hiển thị lỗi lên màn hình terminal nếu có
                console.log(err);
            }
        })
        ```
    - `author.js`:
        - Hiển thị 1 route các sách cùng chung một (hoặc nhiều) tác giả
        ```js
        // Hiển thị url theo tên tác giả
        router.get('/:name', async function (req, res, next) {
            try {
                // Filter tên tác giả và thay khoảng cách giữa các kí tự thành dấu '-'
                let name = req.params.name.replace(/-/gi, ' ')

                // Lấy danh mục sách và sách theo tên tác giả
                let getCategory = await category.getCategory()
                let getBookByAuthor = await books.getBookByAuthor(name)

                // Xuất ra index.njk
                res.render('index', {
                    title: 'IT Book Store',
                    books: getBookByAuthor,
                    paginate : false,
                    getCategory
                })
            } catch (err) {
                // Bắt lỗi và xuất ra Terminal nếu có
                console.log(err);
            }
        })
        ```
    - `search.js`:
        - Dành cho khung tìm kiếm
        ```js
        // Hiển trị danh sách tìm kiếm trên trang search/?seach=
        router.get('/', async function (req, res, next) {
            // Biến lấy dữ liệu người dùng nhập vào form tìm kiếm
            let searchText = req.query.search
            try{
                // Lấy danh sách các danh mục chính. Danh sách các sách (theo tên, tác giả) mà người tìm kiếm
                const getCategory = await category.getCategory()
                const getBook = await books.searchBook(searchText)

                // Xuất ra index.njk
                res.render('index',{ 
                    title: `Search for ${searchText}`,
                    books: getBook,
                    getCategory
                })
            } catch(err){
                // Hiển thị thông báo lỗi trên Terminal nếu có
                console.log(err.message);
            }
        })
        ```
### Client side (Nunjucks)
#### Layout 
- `layout.njk` File layout chính để làm cấu trúc hiển thị tất cả mọi trang gồm 2 vùng chính là Navigation và Container trong đó có 3 thành phần con:  
    - Navigation menu & search form (luôn hiển thị ở mọi trang) trong vùng Navigation
    ```html
    <section>
      {% block search %}
      {% include "search.njk" %}
      {% endblock %}
    </section>
    ```
    - Categories component ở **section left** và Detail component ở **section right** trong vùng Container 
    ```html
    <div class="container paddingless">
      <!-- Categories component -->
      <section class='left'>
      {% block left %}
        <!-- Hiển thị danh sách các danh mục sách(cố định ở mọi trang) -->
        {% include "categories.njk" %}
      {% endblock %}
      </section>
      <!-- Detail component -->
      <section class='right'>
      <!-- Dùng để hiển thị các trang còn lại như index(trang chủ), author, detail, search -->
        {% block right %}
        {% endblock %}
      </section>
    </div>
    ```
### Navigation, search component
- `search.njk`: Component nằm ở đầu mỗi trang, bao gồm 2 phần là Navigation menu và search form
  ```html
  {% block body %}
    <div id="search">
      <div class="wrapper">
        <div class="left">
          <ul class="paddingless marginless nav">
            <li class="nav-item">
              <button class="dropbtn">
                <!-- Menu trang chủ -->
                <a href="/">All IT eBooks</a>
              </button>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <!-- Dropdown Categories và subCategories -->
                <button class="dropbtn">Categories</button>
                  <div class="dropdown-content">
                    <ul class="category paddingless">
                      {% for item in getCategory %}
                      <li class="dropdown sub-category paddingless marginless">
                        <a href="/categories/{{item.name | replace(' &', '') | replace(' ', '-')}}">
                          {{item.name}}
                        </a>
                        <ul class="category dropdown-content paddingless">
                          {% for subCategory in item.category %}
                          <li class="sub-category paddingless marginless">
                            <a href="/categories/{{item.name | replace(' &', '') | replace(' ', '-')}}/{{subCategory.name | replace(' &', '') | replace(' ', '-')}}">
                              {{subCategory.name}}
                            </a>
                          </li>
                          {% endfor %}  
                        </ul>
                      </li>
	                    {% endfor %}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="right">
          <!-- Form search -->
          <form method="get" action="/search/">
            <input name="search" />
            <input type="submit" value="Search"/>
          </form>
        </div>
      </div>
    </div>
  {% endblock %}
	```

### Categories component
-	`categories.njk`: Component in ra danh sách tất cả các danh mục chính cho **section left** trong `layout.njk`
  ```html
  {% block body %}
    <ul class="categories">
      <!-- Tạo vòng lặp để in ra danh sách các danh mục -->
      {% for item in getCategory %}
      <li>
        <!-- filter tên danh mục để thay thế các khoảng cách ở mỗi kí tự thành dấu '-' -->
        <a href="/categories/{{item.name | replace(' &', '') | replace(' ', '-') | lower}}">
          {{item.name}}
        </a>
      </li>
      {% endfor %}
    </ul>
  {% endblock %}
  ```

### Index, detail, author component
Bằng cách cấu hình phân vùng **block right** trong file `layout.njk` ta có thể tạo ra các trang có nội dung khác nhau để phù hợp với từng mục đích của trang
- `index.njk`: trang chủ của bookstore
	- Sử dụng trên cấu trúc trang `layout.njk` và cấu hình lại phần **block right**
	- Đây cũng là trang sử dụng như `author.njk` cho route `/authors` nhưng nhập vào làm 1 vì cấu trúc trang giống nhau (dữ liệu cho từng trang đã được xử lý bên phần server)
    ```html
    <!-- Sử dụng theo cấu trúc file layout bằng cách gọi ra file layout.njk -->
    {% extends "layout.njk" %}

    <!-- Cấu hình lại block right cho phù hợp với nội dung trang chủ -->
    {% block right %}
      <!-- Sử dụng vòng lặp trong nunjucks để in ra tất cả các đầu sách đã được lấy ra từ file index.js trong folder routes -->
      {% for book in books %} 
      <article class="book">
        <!-- Hình bìa sách -->
        <div class="thumbnail">
          <a href="/books/{{ book.title | lower | replace(" ", "-") }}">
            <img src="/img/{{ book.image }}" height="230" width="180" alt="{{book.title}}"/>
          </a>
        </div>
        <div class="body">
          <header class="header">
            <!-- Tiêu đề sách -->
            <h3 class="title marginless">
              <a href="/books/{{ book.title | lower | replace(" ", "-") }}" >
                {{book.title}}
              </a>
            </h3>
            <!-- Tên tác giả của mỗi đầu sách -->
            <p class="author marginless">
              By: {% for item in book.author %} 
              <a href="/authors/{{ item | replace(' ', '-') }}">
                {{item}} 
              </a>
                <!-- Tạo ra dấu phẩy (,) ngăn cách mỗi tác giả nếu sách có nhiều hơn 1 tác giả -->
                {{ "," if not loop.last }}
              {% endfor %}
            </p>
          </header>
          <div class="summary">
            <!-- Tóm tắt nội dung sách (trong 500 từ) -->
            <p>
              {{book.description | safe | truncate(500)}}
            </p>
          </div>
        </div>
      </article>
      {% endfor %}
       <!-- Tạo ra nút chuyển trang (vì trang chủ chỉ hiện 10 đầu sách cho mỗi trang nên có thể nhiều hơn 10 sách) bằng cách gọi vào file pagination.njk -->
      {% if paginate %}
        {% include 'pagination.njk' %}
      {% endif %}
    {% endblock %}
    ```
- `detail.njk`: 
  ```html
  {% extends "layout.njk" %}

  {% block right %}
		<!-- Tiêu đề sách -->
    <h2 class="detail-title">{{book.title}}</h2>
	    <article class="book">
				<!-- Hình bìa sách -->
	      <div class="thumbnail">
	        <a href="/books/{{ book.title | lower | replace(" ", "-") }}">
	          <img src="/img/{{ book.image }}" height="450" width="300" alt="{{book.title}}"/>
	        </a>
        </div>
	      <div class="body">
	        <header class="header">
	          <dl>

	            <dt>Author: <!-- Tên tác giả --></dt>
	            <dd>
	              {% for item in book.author | list %} 
	              <a href="/authors/{{ item | replace(' ', '-') }}">
	                {{ item }}
	              </a>
	              <!-- Ngăn cách mỗi tác giả bằng dấu phẩy(,) nếu sách có nhiều hơn 1 tác giả -->
	                {{ "," if not loop.last }}
	              {% endfor %}
	            </dd>

	            <dt>ISBN-10: <!-- Mã sách --></dt>
	            <dd>{{book.isbn_10}}</dd>
							
	            <dt>Year: <!-- Năm xuất bản --></dt>
	            <dd>{{book.year}}</dd>
							
	            <dt>Pages: <!-- Tổng số trang --></dt>
	            <dd>{{book.page}}</dd>
							
	            <dt>Language: <!-- Ngôn sữ sách --></dt>
	            <dd>{{book.language}}</dd>
							
	            <dt>File size: <!-- Dung lượng sách online --></dt>
	            <dd>{{book.file_size}}</dd>
							
	            <dt>File format: <!-- Định dạng sách online --></dt>
	            <dd>{{book.file_format}}</a></dd>
							
	            <dt>Category: <!-- Thể loại sách --></dt>
	            <dd>
	              <a href="/categories/{{ book.top_category | lower | replace(" ", "-") }}">
	                {{book.top_category}}
	              </a>
	            </dd>
	          </dl>
	        <header>
	      </div>
	      <div class="summary" style="font-size:0.9rem">
	      <!-- Tóm tắt nội dung sách (đầy đủ nội dung tóm tắt) -->
	        <h3>Book Description:</h3>
	          {{book.description | safe}}
	      </div>
	      <div class="button">
	      <!-- Link download sách online -->
	        <button class="download">
	          <a href="{{book.download_link}}">
	            Download PDF {{book.file_size}}
	          </a>
	        </button>
	      </div>
	    </article>
	{% endblock %}
  ```
### Pagination
- `pagination.njk`:
	- Trang tạo ra paginate button
	```html
	<div class='pagination'>
	<!-- Vị trí mặc định cho mỗi phân trang(trang 1) -->
  <a href="{{root}}/">1</a>

	<!-- Tạo vòng lặp để xuất ra tất cả các phân trang theo số lượng sách, tác giả, tìm kiếm của người dùng theo từng route -->
  {% for page in range(2, pages, 1) %}
    {% if currentPage-page === 1 or page - currentPage === 1 or currentPage === page%}
      <a href="{{root}}/?page={{page}}">{{page}}</a>
    {%endif%}
  {% endfor%}

	<!-- Số phân trang cuối cùng của mỗi route -->
  <a href="{{root}}/?page={{pages}}">
		{{pages}}
	</a>
	</div>
	```