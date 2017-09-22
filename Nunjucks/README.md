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
    - [Client side](#client-side)
        - [Template engine](#template-engine)
        - [Layout](#layout)
        - [Navigation component](#navigation-component)
        - [Search component](#search-component)
        - [Detail, Author component](#detail-author-component)
        - [Pagination buttons](#pagination-buttons)

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
