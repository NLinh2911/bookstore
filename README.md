## bookstore-Vueclient: Mô phỏng trang giỏ hàng

- #### Nút thêm giỏ hàng sẽ được đặt ở trang chủ
- #### Các Component được thêm là `addCartButton.vue` và `cart.vue`

###1. Trang `addCartButton.vue`:
- Khi Click vào nút thêm vào giỏ hàng `Add to Cart`:
  - emit sự kiện `addCart` để lưu item cần add vào Cart.
  - Thay đổi giá trị của data `isAdding` để thay đổi button từ `Add to Cart` sang `Remove from Cart`.

- Khi Click vào nút `Remove from Cart`:
  - emit sự kiện `removeCart` để xóa item đã add vào Cart
  - Thay đổi giá trị của data `isAdding` để thay đổi button từ `Remove from Cart` sang `Add to Cart`
###2. Trang `thumnailBook.vue`:
Xử lý data nhận được từ sự kiện emit của component con `addCartButton.vue`.
- Tạo một data là mảng rỗng: `Cart`
- Tạo 1 methods `add` để nhận sự kiện `addCart`:
  - Push `item` vào mảng `Cart`
  - Update số lượng item bằng cách emit sự kiện `updateNum`. Số lượng item sẽ được hiện thị trên thanh menu
  - Lưu mảng `Cart` vào `LocalStorage`: Vì trình duyệt chỉ xử lý data dưới dạng string, do đó dùng hàm `JSON.stringify` để convert object sang dạng chuỗi trước khi lưu vào `localstorage`.
  ```js
  add (item) {
    this.Cart.push(item)
  //   let num = this.Cart.length
    this.$emit('updateNum', this.Cart)
    localStorage.setItem('yourItemCart', JSON.stringify(  this.Cart))
  }
  ```

- Tạo 1 methods `remove` để nhận sự kiện `removeCart`:
  - Kiểm tra vị trí của item trong mảng `Cart`, dùng hàm `splice()` để cắt item đó ra khỏi mảng. Sau đó update số lượng item bằng cách emit sự kiện `updateNum`
  ```js
  let index = this.Cart.findIndex(p => p.id === moveItem)
  this.Cart.splice(index, 1)
  let num = this.Cart.length
  this.$emit('updateNum', num)
  ```

###3.Trang `homepage.vue`:
 Cập nhật data từ sự kiện emit ở trang `thumnailBook.vue`, truyền data sang components con là `mainmenu.vue` để hiện thị số lượng item đã add vào Cart.

###4. Trang `Cart.vue`
Xử lý item đã lưu trong giỏ hàng
- Lấy item trong mảng `Cart` đã lưu trong `localstorage` ra và render ra browser.
```js
created () {
  this.fetchData()
  this.itemCart = JSON.parse(localStorage.getItem('yourItemCart'))
  console.log('this.itemCart', this.itemCart)
  this.AddNewCart()
}
```
- Khởi tạo hàm `this.AddNewCart()` nhằm tạo một mảng mới chỉ chứa những thông số cần lưu trong giỏ hàng bao gồm: ID, quantity, price. Mặc định quantity ban đầu bằng `1`
- Dùng phương thức ` @input="updateQuantity(index, $event)"` trong input để cập nhật số lượng item trong giỏ.
```js
updateQuantity: function (index, event) {
  let count = event.target.value
  let productID = this.itemCart[index].id
  this.$set(this.newCart[index], 'quantity', count)
}
```
>Phương thức `this.$set(this.newCart[index], 'quantity', count)` dùng để set lại giá trị của quantity theo giá trị update trong ô input

- Tính toán giá trị giỏ hàng bằng hàm `subTotal` ở phương thức `computed`
  ```js
  subTotal: function () {
    let subTotal = 0
    for (let i = 0; i < this.newCart.length; i++) {
      subTotal += parseInt(this.newCart[i].quantity) * parseInt(this.newCart[i].price)
    }
    return subTotal
  }
  ```
- Dùng methods `removeItemCart()` để remove item trong giỏ:
```js
removeItemCart (index) {
  this.itemCart.splice(index, 1)
  this.newCart.splice(index, 1)
  localStorage.setItem('yourItemCart', JSON.stringify(this.itemCart))
},
```
> Phải cập nhật item cả trong mảng gốc `itemCart` và mảng cart mới `newCart` nhằm tính toán đúng giá trị trong hàm `subTotal` ở phương thức `computed`
