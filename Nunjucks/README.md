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

---

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
            và cấu hình lại cho trùng nhau. 
            "dialect": "postgres",
            "schema": "public",
            "logging": false
        }
        ```
        - Thay đổi mật khẩu tại dòng  `password` trùng với mật khẩu postgres trên máy mình 
        - Kiểm tra `port` trên máy mình có giống với port trên file config hay ko 
4. Tạo bảng và chèn dữ liệu:
    - Tạo các bảng mới, thêm cột và chèn dữ liệu cho CSDL bằng các câu lệnh theo thứ tự:
        ```bash
        $ cd crawl-data
        $ node create-table.js
        $ node insert-category.js
        $ node insert-book.js
        $ cd ..
        ```
5. Chạy ứng dụng:
    ```
    npm start
    ```
Ứng dụng chạy trên port 3000 nên mở trình duyệt và nhập đường dẫn:
>localhost:3000 

## Tài liệu hướng dẫn