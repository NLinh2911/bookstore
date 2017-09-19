# Bookstore web appication

## Giới thiệu
Bookstore (ứng dụng đọc sách online) được xây dựng theo phong cách **Monolithic applications** (*kiến trúc hệ thống một khối*) dựa trên nền tảng thiết kế MVC design pattern, với các công nghệ được áp dụng như:
- [Node.js (server)](https://nodejs.org)
- [Express (middleware)](https:http://expressjs.com/)
- [Nunjucks (template engine)](https://mozilla.github.io/nunjucks/)
- [Postgres (database)](https://postgresql.org)
- [Nightmare (crawling data)](http://nightmarejs.org/)
---
## Cài đặt
1. Open terminal và clone repository về máy bằng câu lệnh:

    ```
    git clone https://github.com/NLinh2911/bookstore
    ```

2. Cài đặt node_modules:
    ```
    cd bookstore
    npm install
    ```
3. Khởi tạo và cấu hình database:
    
    - Tạo 1 database trong postgres server có tên là: **itbook2**
    - MỞ file `config.json` trong folder `config` sau đó đổi lại mật khẩu trùng với mật khẩu postgres trong máy mình
        ```
        "development": {
            "username": "postgres",
            "password": "secretpassword", <-- Change your password here
            "database": "itbook2",
            "host": "localhost",
            "port": 5432, <-- kiểm tra port trên máy mình có giống với port trên file config hay ko và cấu hình lại cho trùng nhau.
            "dialect": "postgres",
            "schema": "public",
            "logging": false
        }
        ```
4. Tạo bảng và chèn dữ liệu:
    
    - Tạo các bảng mới, thêm cột và chèn dữ liệu cho CSDL bằng các câu lệnh theo thứ tự:
        ```
        node crawl-data/create-table.js
        node crawl-data/insert-category.js
        node crawl-data/insert-book.js
        ``` 