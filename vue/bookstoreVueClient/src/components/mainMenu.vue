<template lang="html">
    <div id="search">
      <div class="wrapper">
        <div class="left">
            <ul class="paddingless marginless nav">
                <li class="nav-item">
                  <button type="button" class="dropbtn">
                    <a href="#">All IT eBooks</a>
                  </button>
                </li>
                <li class="nav-item">
                  <div class="dropdown">
                    <button type="button" class="dropbtn">
                      <a href="#">Categories</a>
                    </button>
                    <div class="dropdown-content">
                      <ul class="category paddingless" v-for="cate in category">
                          <li class="sub-category paddingless marginless">
                            <a href="#"><router-link to="/">{{cate.name}}</router-link></a>
                            <ul>
                            </ul>
                          </li>
                      </ul>
                    </div>
                  </div>
                </li>
            </ul>
        </div>
         <div class="right">
            <a href="#">Search</a>
         </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
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
          this.category = category
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="css">

</style>
