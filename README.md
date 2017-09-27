## bookstore-Vueclient: Xây dựng phần Client Vue theo mẫu website: http://www.allitebooks.com/
> Document này chỉ giải thích phần xử lý client Vuejs - nhận data từ Database qua API được Server Express cấp trong folder api (trong folder Nunjucks)

1. Cấu trúc Router chính:
- Trang chủ `homepage.vue`
- Tìm kiếm theo author: `/books/:id`
- Tìm kiếm theo category: `/category/:id`
- Tìm kiếm theo subcategory: `/category/:topCategory/:subcategory`

2. Cấu trúc component chính:
- Cấu trúc chung: Gồm Topmenu, sidebar menu, content và phân trang.
  - Topmenu được tạo 1 component riêng là  `mainmenu.vue` sẽ gồm phần search - có thẻ input để get thông tin search
  - Phần content thay đổi được tạo component riêng là `thumnailBook.vue`. Tùy thuộc từng trang để content thay đổi phụ thuộc vào kết quả search hoặc số trang hiện tại.
- Trang chủ: `homepage.vue`:
  - Topmenu
  - Sidebar menu
  - Phần content: Lấy data trả về từ Axios
```js
fetchData () {
  axios.get(`http://localhost:3000/api/`)
    .then(res => {
      // console.log('res', res)
      let category = res.data.getCategory
      let Book = res.data.getBook
      let pages = res.data.pages
      this.category = category
      this.Book = Book
      this.pages = pages
      // console.log('Book', Book)
    })
    .catch(error => {
      console.log(error)
    })
}
```

  - Phần phân trang sẽ tạo component là `pagination.vue`, số trang sẽ được xử lý qua data nhận về thông qua axios:
```js
fetchDataInPage () {
  let id = this.$route.params.id
  // console.log('id', id)
  axios.get(`http://localhost:3000/api`, {
    id
  })
  .then(res => {
    // console.log('res.data.getBook', res.data)
    let Book = res.data
    this.Book = Book
  })
  .catch(error => {
    console.log(error)
  })
}
```
- Category.vue: Trang kết quả tìm kiếm theo category và subcategory. (2 router tìm kiếm qua category và subcategory đều nằm trong 1 component)
  - Khi tìm kiếm theo category:
Khi component category được created, gọi hàm fetchCategory() để lấy data về category
```js
created () {
  this.fetchCategory()
}
```
   Trong methods, khai báo hàm fetchCategory()
```js
fetchCategory () {
  axios.get(`http://localhost:3000/api/category/` + this.id)
    .then(res => {
      // console.log(res)
      let category = res.data.getCategory
      let Book = res.data.getBookByTopCategory
      // console.log('Book', Book)
      this.category = category
      this.Book = Book
    })
    .catch(error => {
      console.log(error)
    })
}
```
  - Khi tìm kiếm theo subcategory: Vì cùng nằm trên 1 component với category nên không thể gọi hàm fetchSubcategory() để lấy dữ liệu cùng với fetchCategory() khi component được created(Nếu call đồng thời 2 function trong khi truy vấn chỉ tìm dữ liệu category thì hàm `this.fetchSubcategory()` sẽ trả về `undefied`). Do đó dùng phương thức `watch` để kiểm tra sự thay đổi trên route để gọi function:
```js
watch: {
  '$route.params.subcategory' (to, from) {
// console.log('this.$route.params.subcategory', this.$route.params.subcategory)
    this.fetchSubcategory()
  },
  '$route.params.id' (to, from) {
    // console.log('this.$route.params.id', this.$route.params.id)
    this.id = this.$route.params.id
    this.fetchCategory()
  }
}
```
> Cú pháp '$route.params.subcategory' hay '$route.params.id' phụ thuộc vào khai báo trong file router index.js

  - Khi tìm kiếm theo author: Dựa vào route `id: this.$route.params.id` để call axios lên server:
```js
axios.get(`http://localhost:3000/api/author/` + this.id)
  .then(res => {
    // console.log('fetchData', res)
    let getBookByAuthor = res.data.getBookByAuthor
    this.getBookByAuthor = getBookByAuthor
    // console.log('this.getBookByAuthor', getBookByAuthor)
  })
  .catch(error => {
    console.log(error)
  })
}
```
3. Start server

  - Truy cập folder và chạy dòng lệnh:  
  ```js
    npm run dev
  ```
  - Server sẽ start ở cổng `localhost:8080`