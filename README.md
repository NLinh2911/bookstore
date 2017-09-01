# bookstore


# Các file xử lý dữ liệu, kết nối với CSDL trong folder `models`

# Cào dữ liệu:
### `book-category.js` dùng để cào category. Cào các top-level category rồi để có `parent_id` rồi cào các sub-categories
  ```js
  // ví dụ category Web Development
  {
    id: 1,
    name: 'Web Development',
    parent_id: null // ho
  }
  // category ASP.NET là sub của Web Development
  {
    id: 16,
    name: 'ASP.NET',
    parent_id: 1
  }
  ```
* Chạy `insert-category.js` để insert vào CSDL

### `crawl-all.js` cào dữ liệu chi tiết của sách. Run file để cào từng trang
* Thay đường dẫn `http://www.allitebooks.com/page/15` cho từng trang
* Sách trong mỗi trang lưu vào 1 file riêng, ví dụ `product_data15.json`
* Sau đó chạy `combine-json.js` để gộp tất cả các files này thành 1 file `total_product.json` (thay tên file cào về)
* Chạy `insert-book.js` để insert vào CSDL