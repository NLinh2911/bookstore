<template>
  <div class="container paddingless">
    <section class="left" v-if >
      <ul v-for="cate in category">
        <li><a href="#"><router-link to="/">{{cate.name}}</router-link></a></li>
      </ul>
    </section>
    <section class="right">
        <singleBook ></singleBook>
    </section>
  </div>
</template>

<script>
import singleBook from '@/components/singleBook'
import axios from 'axios'
export default {
  name: 'hello',
  components: {
    singleBook: singleBook
  },
  data () {
    return {
      category: []
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
          // console.log(category)
          this.category = category
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
