<template lang="html">
    <div id="search">
      <div class="wrapper">
        <div class="left">
            <ul class="paddingless marginless nav">
                <li class="nav-item">
                <a href="#">  <button type="button" class="dropbtn">
                    All IT eBooks
                  </button></a>
                </li>
                <li class="nav-item">
                  <div class="dropdown">
                    <button type="button" class="dropbtn">
                      <a href="#">Categories</a>
                    </button>
                    <div class="dropdown-content">
                      <ul class="category paddingless" v-for="cate in category">
                          <li class="sub-category paddingless marginless" >
                            <a href="#"><router-link :to="{path: `/category/${cate.name}`}">{{cate.name}}</router-link></a>
                            <ul class="category dropdown-content paddingless" >
                                <li class="sub-category paddingless marginless" v-for="subcategory in cate.category" >
                                      <a href="#"><router-link :to="{path: `/category/${cate.name}/${subcategory.name}`}">{{ subcategory.name}}</router-link></a>
                                </li>
                            </ul>
                          </li>
                      </ul>
                    </div>
                  </div>
                </li>
            </ul>
        </div>
         <div class="right">
            <!-- <a href="#">Search</a> -->
            <div>
            <form @submit.prevent="searchBook" method="get">
              <input type="text" name="search" v-model="searchvalue">
              <input type="submit" value="Search">
            </form>
            </div>
         </div>
            <div class="cart" >
              <router-link to="/cart" id="cart">
               <i class="fa fa-shopping-cart"></i>
             <span v-if="update">Cart ({{update}})</span>
             <span v-else>Cart (0)</span>
             </router-link>
            </div>         
      </div>
    </div>
</template>

<script>
export default {
  props: ['category', 'update'],
  data () {
    return {
      searchvalue: ''
    }
  },
  methods: {
    searchBook () {
      this.$emit('search', this.searchvalue)
    }
  }
}
</script>

<style lang="css">
.right form {
  margin-top: 3%;
}

.cart {
  display: block;
  color: white;
  margin: 1.2rem;
  width: 10%;
}
.cart  > #cart{
  color:white
}
.cart a.router-link-active{
  display:none
}
@media all and (max-width: 1024px) {
  .cart > a{
    font-size: 13px;
  }
  .right {
    margin-top: 2%
  }
}
</style>
