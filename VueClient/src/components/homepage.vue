<template>
<div>
      <mainMenu :category="category"  @search="searchData($event)" :update="update"></mainMenu>
  <div class="container paddingless">
    <section class="left" >
      <ul v-for="cate in category" :key="cate.id">
        <li><a href="#"><router-link :to="{path: `/category/${cate.name}`}">{{cate.name}}</router-link></a></li>
      </ul>
    </section>
    <section class="right">
        <thumnailBook :book="Book" @updateNum="addNum($event)"></thumnailBook>
    </section>
  </div>
  <pagination :Pages ="pages" @change = "fetchDataInPage()"></pagination>
</div>
</template>

<script>
import mainMenu from '@/components/mainMenu'
import thumnailBook from '@/components/thumnailBook'
import pagination from '@/components/pagination'
import axios from 'axios'
export default {
  name: 'homepage',
  components: {
    thumnailBook: thumnailBook,
    mainMenu: mainMenu,
    pagination: pagination
  },
  data () {
    return {
      category: [],
      Book: [],
      pages: [],
      update: ''
    }
  },
  created () {
    this.fetchData()
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
    fetchDataInPage () {
      let id = this.$route.params.id
      // console.log('id', id)
      axios.post(`http://localhost:3000/api`, {
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
    },
    searchData (searchvalue) {
      // console.log('searchvalue', searchvalue)
      axios.post(`http://localhost:3000/api/search`, {
        searchvalue
      })
      .then(res => {
        console.log('res.data', res.data)
        let Book = res.data.getBook
        this.Book = Book
      })
      .catch(error => {
        console.log(error)
      })
    },
    addNum (index) {
      // console.log('Hello World')
      this.update = index.length
      // console.log('this.update', this.update)
      // console.log('index', index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Section left */
section.left {
    font-size: 1rem;
    width: 20vw;
    text-align: left;
}

section.left ul {
    color: var(--cherry-red);
    padding: 0 5% 5% 5%;
}
section.left li a{
  font-weight: bold;
  color: #c40000
}
section.left li:not(:last-child) {
    margin-bottom: 0.5rem;
}
.book {
      margin: 0 !important;
    float: right;
}
</style>
