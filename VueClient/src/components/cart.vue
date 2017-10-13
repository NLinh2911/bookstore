<template>
  <div>
    <mainMenu :category="category"  @search="searchData($event)" ></mainMenu>
    <h1 style="text-transform: uppercase; font-size: 30px;margin:10px; font-weight:bold"> Giỏ hàng</h1>
    <!-- Product List -->
  <section class="info">
      <ul class="products" v-for="(items, index) in itemCart" :key="items.index">
        <li class="row">
          <div class="col left">
            <div class="thumbnail1">
              <a href="#">
                <img :src="imagePath(items.image)">
              </a>
            </div>
            <div class="detail">
              <div class="name"><h1>{{ items.title }}</h1></div>
              <div class="description" v-html=" $options.filters.truncate(items.description, 500)"></div>
              <div class="price">{{ items.price }} VND</div>
            </div>
          </div>

          <div class="col right">
            <div class="quantity">
              <input type="number" class="quantity" min="1" value="1" @input="updateQuantity(index, $event)" />
            </div>
            <div class="remove">
            <i class="fa fa-times" aria-hidden="true" @click="removeItemCart(index)"></i>
            </div>
          </div>
        </li>
    </ul>
  </section>
  <hr>
  <!-- End Product List -->

  <!-- Subtotal -->
      <ul id="totalPrice"> 
        <li>Thành tiền<span> {{subTotal}}</span></li>
        <li><button  @click="sendItem">Shopping now</button></li>
      </ul> 
  <!-- End Subtotal -->
  <!-- Modal-->
<div class="modal " :class="actived">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Please Confirm Your Cart</p>
      <button class="delete" aria-label="close" @click="close"></button>
    </header>
    <section class="modal-card-body">
      <h2>Are you ready to buy these book?</h2>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">ENROLL NOW</button>
      <button class="button"  @click="close">Cancel</button>
    </footer>
  </div>
</div>
  <!--End Modal-->
  </div>
</template>
<script>
import mainMenu from '@/components/mainMenu'
import axios from 'axios'

export default {
  components: {
    mainMenu: mainMenu
  },
  data () {
    return {
      category: [],
      itemCart: [],
      product: {},
      newCart: [],
      actived: ''
    }
  },
  created () {
    this.fetchData()
    this.itemCart = JSON.parse(localStorage.getItem('yourItemCart'))
    console.log('this.itemCart', this.itemCart)
    this.AddNewCart()
    // localStorage.removeItem('yourItemCart')
  },
  methods: {
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
    },
    imagePath: (img) => {
      return require('../assets/images/' + img)
    },
    removeItemCart (index) {
      // console.log('index', index)
      this.itemCart.splice(index, 1)
      this.newCart.splice(index, 1)
      // console.log('this.itemCartthis.itemCart', this.itemCart)
      // console.log('this.newCart', this.newCart)
      // this.AddNewCart()
      localStorage.setItem('yourItemCart', JSON.stringify(this.itemCart))
    },
    updateQuantity: function (index, event) {
      let count = event.target.value
      let productID = this.itemCart[index].id
      console.log('count', count)
      console.log('productID', productID)
      console.log('this.newCart', this.newCart)
      this.$set(this.newCart[index], 'quantity', count)
    },
    AddNewCart () {
      for (let i = 0; i < this.itemCart.length; i++) {
        let temp = {}
        temp.id = this.itemCart[i].id
        temp.price = this.itemCart[i].price
        temp.quantity = 1
        this.newCart.push(temp)
      }
      return this.newCart
    },
    sendItem () {
      console.log('this.newCart', this.newCart)
      this.actived = 'is-active'
    },
    close () {
      this.actived = ''
    }
  },
  computed: {
    subTotal: function () {
      let subTotal = 0
      for (let i = 0; i < this.newCart.length; i++) {
        subTotal += parseInt(this.newCart[i].quantity) * parseInt(this.newCart[i].price)
      }
      return subTotal
    }
  },
  filters: {
    truncate: function (string, value) {
      return string.substring(0, value) + '...'
    }
  }
}
</script>
<style>

.info {
  display: flex;
  flex-direction: column;
}

img {
  max-width: 100%;
  vertical-align: middle;
  border-radius: 4px;
}

.row{
  display: flex;
}
.col.left{
  width: 50%;
  flex-grow: 2;
    justify-content: flex-start;
    display: flex;
}

.thumbnail1{
  width: 40%
}
.thumbnail1 > a > img {
  width: 20vh;
}
.detail{
  width: 60%;
    text-align: left;
    padding: 1rem 0.5rem;
  line-height: 1.5rem;
}
.col.right{
  flex-grow: 1;
  display: flex;
}

.detail .name {
  font-size: 1.2rem;
}

.detail .description {
  color: #7d7d7d;
  font-size: 1rem;
}

.detail .price {
  font-size: 1.5rem;
}

.quantity, .remove {
  width: 50%;
  text-align: center;
  align-self: center;
}
.quantity > input {
  display: inline-block;
  width: 40px;
  font-size: 1.5rem
}
.remove i{
  font-size: 2rem;
  cursor: pointer;
}
#totalPrice > li > span{
  font-size: 1.2rem;
  display: inline-block;
  font-weight: bold;
  margin-left: 20px;
}
#totalPrice > li{
  font-size: 1.2rem;
  display: inline-block;
  font-weight: bold
}
#totalPrice {
      display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;
}
#totalPrice li {
  padding: 8px;
}
#totalPrice button {
  font-size: 1.3rem;
   padding: 10px 30px;
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
  color:white;
  cursor: pointer;
}
.modal-card-body{
  font-size: 18px;
}
.modal-card-title{
  font-size: 22px;
  text-transform: uppercase;
  color:#16cc9b;
  font-weight: bold
}
</style>
