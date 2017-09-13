<template>
<div>
      <mainMenu :category="Category" @search="searchData($event)"></mainMenu>
  <div class="container paddingless">
    <section class="left" >
      <ul v-for="cate in Category" :key="cate.id">
        <li><a href="#"><router-link :to="{path: `/category/${cate.name}`}">{{cate.name}}</router-link></a></li>
      </ul>
    </section>
    <section class="right">
       <div class="entry-header" v-if="getSingleBook">
          <h1 class="single-title">{{getSingleBook.title}}</h1>
          <div class="entry-meta">
              <div class="entry-body-thumbnail" v-if="getSingleBook.image">
                <img :src="imagePath(getSingleBook.image)" alt="">
              </div>
              <div class="book-detail">
                  <table >
                    <tr>
                      <td><Strong> Author:</Strong></td>
                      <td><span v-for="item in getSingleBook.author" :key="item.id">{{item}}</span> </td>
                    </tr>
                    <tr>
                      <td><Strong> ISBN-10:</Strong></td>
                      <td>{{getSingleBook.isbn_10}}</td>
                    </tr>            
                    <tr>
                      <td><Strong> Year</Strong></td>
                      <td>{{getSingleBook.year}}</td>
                    </tr>        
                    <tr>
                      <td><Strong> Pages:</Strong></td>
                      <td>{{getSingleBook.isbn_10}}</td>
                    </tr>
                    <tr>
                      <td><Strong> Language:</Strong></td>
                      <td>{{getSingleBook.isbn_10}}</td>
                    </tr> 
                    <tr>
                      <td><Strong> File size:</Strong></td>
                      <td>{{getSingleBook.size}}</td>
                    </tr> 
                    <tr>
                      <td><Strong> File format:</Strong></td>
                      <td>{{getSingleBook.file_format}}</td>
                    </tr>                                                                          
                    <tr>
                      <td><Strong> Category:</Strong></td>
                      <td>{{getSingleBook.category}}</td>
                    </tr>                                                                                                                                                                                           
                  </table>
              </div>
              </hr>
              </div>
              <h3 id="book-description">Book description</h3>
              <div class="book-description" v-html="getSingleBook.description">
              </div>
              <div id="button">
                  <a :href="getSingleBook.download_link"><button>Download PDF</button></a>
                  <a :href="getSingleBook.read_link"><button>Read Online</button></a>                  
              </div>
       </div>
        <div v-if="getBookByAuthor">
        <article v-for="item in getBookByAuthor" class="book" :key="item.id">
          <div class="thumbnail">
              <a href=""><img :src="imagePath(item.image)" alt=""></a>
          </div>
          <div class="body">
              <header class="header">
                  <h3 class="title marginless"><router-link :to="{path: `books/${item.title}`}">{{ item.title}}</router-link></h3>
                  <h5 class="author marginless">By: <a href=""><router-link to="author/item.author"><span v-for="items in item.author" :key="items.id">{{ items}}</span></router-link></a></h5>
                 <header class="summary" v-html="$options.filters.truncate(item.description,700)"></header>
              </header>
          </div>
        </article>
      </div>
    </section>
  </div>
</div>
</template>
<script>
import mainMenu from '@/components/mainMenu'
import pagination from '@/components/pagination'
import axios from 'axios'
export default {
  components: {
    mainMenu: mainMenu,
    pagination: pagination
  },
  data () {
    return {
      id: this.$route.params.id,
      Category: [],
      getSingleBook: [],
      getBookByAuthor: []
    }
  },
  created () {
    this.fetchData()
    this.getData()
  },
  methods: {
    fetchData () {
      axios.get(`http://localhost:3000/api/detail/` + this.id)
        .then(res => {
          // console.log('fetchData', res)
          let getSingleBook = res.data.getSingleBook
          this.getSingleBook = getSingleBook
        })
        .catch(error => {
          console.log(error)
        })
    },
    getData () {
      axios.get(`http://localhost:3000/api/`)
        .then(res => {
          let Category = res.data.getCategory
          this.Category = Category
          // console.log(Category)
        })
        .catch(error => {
          console.log(error)
        })
    },
    imagePath: (img) => {
      return require('../assets/images/' + img)
    },
    searchData (searchvalue) {
      // console.log('searchvalue', searchvalue)
      axios.post(`http://localhost:3000/api/search`, {
        searchvalue
      })
      .then(res => {
        console.log('res.data', res.data)
        let Book = res.data.getBook
        this.getBookByAuthor = Book
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
<style>
.container {
  margin-bottom: 20px;
}
section.left {
    font-size: 1rem;
    width: 15vw;
    text-align: left;
}

section.left ul {
    color: var(--cherry-red);
    padding: 0 5% 5% 5%;
}
section.left li a{
  font-weight: bold;
    color: #ff4629
}
section.left li:not(:last-child) {
    margin-bottom: 0.5rem;
}
.book-detail{
  text-align: center
}
.entry-meta .entry-body-thumbnail img {
    max-width: 300px;
    width: 100%;
    max-height: 350px;
    height: 100%;
}
.single-title {
  font-size: 30px;
  font-weight: bold
}
.book-detail span {
  margin-left: 10px;
}
.entry-meta {
  display: flex;
}
.entry-body-thumbnail {
  flex-grow: 1;
}
.book-detail {
  flex-grow: 2;
  text-align: left;
  margin-left: 20px;
}
.book-detail p{
  font-size: 16px;
}
table >tr > td {
  font-size: 15px;
  padding-left: 10px;
  padding-bottom: 1.4rem;
}
.book-description {
  text-align: justify;
  display: flex;
  flex-wrap: wrap;
}
.book-description p {
  font-size: 15px;
}
#book-description {
  text-align: left;
}
#button button{
  background: #ff4629;
  padding: 5px;
  color: white;
  border: none;
  cursor: pointer;
}
#button button:hover{
  background: #e7442a
}
</style>