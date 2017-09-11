<template>
<div>
      <mainMenu :category="category"></mainMenu>
  <div class="container paddingless">
    <section class="left" >
      <ul v-for="cate in category" :key="cate.id">
        <li><a href="#"><router-link to="/">{{cate.name}}</router-link></a></li>
      </ul>
    </section>
    <section class="right">
        <thumnailBook :book="Book"></thumnailBook>
    </section>
  </div>
</div>
</template>

<script>
import mainMenu from '@/components/mainMenu'
import thumnailBook from '@/components/thumnailBook'
import axios from 'axios'
export default {
  name: 'hello',
  components: {
    thumnailBook: thumnailBook,
    mainMenu: mainMenu
  },
  data () {
    return {
      category: [],
      Book: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get(`http://localhost:3000/api/`)
        .then(res => {
          let category = res.data.getCategory
          let Book = res.data.getBook
          this.category = category
          this.Book = Book
          console.log('Book', Book)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Section left */
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
</style>
