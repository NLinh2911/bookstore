<template>
  <div>
    <mainMenu :category="Category"></mainMenu>
    <div class="container paddingless">
      <section class="left">
        <ul v-for="cate in Category" :key="cate.id">
          <li>
            <a href="#">
              <router-link to="/">{{cate.name}}</router-link>
            </a>
          </li>
        </ul>
      </section>
      <section class="right">
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
import axios from 'axios'
export default {
  components: {
    mainMenu: mainMenu
  },
  data () {
    return {
      id: this.$route.params.id,
      Category: [],
      getBookByAuthor: []
    }
  },
  created () {
    this.fetchData()
    this.getData()
  },
  methods: {
    fetchData () {
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
section.left {
  font-size: 1rem;
  width: 15vw;
  text-align: left;
}

section.left ul {
  color: var(--cherry-red);
  padding: 0 5% 5% 5%;
}

section.left li {
  font-weight: bold;
}

section.left li:not(:last-child) {
  margin-bottom: 0.5rem;
}

.book-detail {
  text-align: center
}

.entry-meta .entry-body-thumbnail img {
  max-width: 130px;
  width: 100%;
  max-height: 160px;
  height: 100%;
}

.book-detail span {
  margin-left: 10px;
}
</style>