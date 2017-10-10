<template>
<div>
  <mainMenu :category="category"></mainMenu>
  <div class="container paddingless">
    <section class="left" >
      <ul v-for="cate in category" :key="cate.id">
        <li><a href="#"><router-link :to="{path: `/category/${cate.name}`}">{{cate.name}}</router-link></a></li>
      </ul>
    </section>
    <section class="right">
        <thumnailBook :book="Book" :subBook="subBook"></thumnailBook>
    </section>
  </div>
  <!-- <pagination :Pages ="pages" @change = "fetchDataInPage()"></pagination> -->
</div>
</template>
<script>
import mainMenu from '@/components/mainMenu'
import thumnailBook from '@/components/thumnailBook'
import pagination from '@/components/pagination'
import axios from 'axios'

export default {
  name: 'category',
  components: {
    thumnailBook: thumnailBook,
    mainMenu: mainMenu,
    pagination: pagination
  },
  data () {
    return {
      id: this.$route.params.id,
      category: [],
      Book: [],
      subBook: []
    }
  },
  created () {
    this.fetchCategory()
  },
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
  },
  methods: {
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
    },
    fetchSubcategory () {
      let subCategory = this.$route.params.subcategory
      let topCategory = this.$route.params.topCategory
      // console.log('this.subCategory', subCategory)
      // console.log('topCategory', topCategory)
      axios.get(`http://localhost:3000/api/category/${topCategory}/${subCategory}`)
        .then(res => {
          let Book = res.data.getBookBySubCategory
          this.subBook = Book
          // console.log('subBook', this.subBook)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
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
</style>
