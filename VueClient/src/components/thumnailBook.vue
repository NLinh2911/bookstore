<template lang="html">
    <div >
    <!--Show book in Category-->
      <article v-if="book" v-for="item in book" class="book">
        <div class="thumbnail">
            <a href=""><router-link :to="{path: `books/${item.title}`}"><img :src="imagePath(item.image)" alt=""></router-link></a>
        </div>
        <div class="body">
            <header class="header">
                <h3 class="title marginless"><router-link :to="{path: `${root}/books/${item.title}`}">{{ item.title}}</router-link>    </h3>
               
                <h5 class="author marginless">By: 
                    <a href=""  v-for="items in item.author">
                        <span>
                            <router-link :to="{path:`${root}/author/${items}`}">
                            {{ items}}
                            </router-link>
                        </span>
                      
                    </a>
                </h5>
                <header class="summary" v-html="$options.filters.truncate(item.description, 500)">   </header>    <span  id="price">Price: 200.000 VND</span>
                  <div style="margin-top: 10px;"> <addCartButton :item="item" @removeCart="remove($event)" @addCart="add($event)"></addCartButton>  </div> 
            </header>
        </div>
      </article>
    <!--Show book in SUB Category-->
      <article v-if="subBook" v-for="item in subBook" class="book">
        <div class="thumbnail">
            <a href=""><router-link :to="{path: `books/${item.title}`}"><img :src="imagePath(item.image)" alt=""></router-link></a>
        </div>
        <div class="body">
            <header class="header">
                <h3 class="title marginless"><router-link :to="{path: `${root}/books/${item.title}`}">{{ item.title}}</router-link></h3>
                <h5 class="author marginless">By: 
                    <a href=""  v-for="items in item.author">
                        <span>
                            <router-link :to="{path:`${root}/author/${items}`}">
                            {{ items}}
                            </router-link>
                        </span>
                    </a>
                </h5>
                <header class="summary" v-html="$options.filters.truncate(item.description, 500)"></header>
            </header>

        </div>
      </article>
    </div>
</template>

<script>
import addCartButton from './addCartButton.vue'
export default {
  components: {
    'addCartButton': addCartButton
  },
  data () {
    return {
      root: '',
      addCart: '',
      Cart: [],
      num: ''
    }
  },
  props: ['book', 'subBook'],
  methods: {
    imagePath: (img) => {
      return require('../assets/images/' + img)
    },
    add (item) {
      this.Cart.push(item)
      let num = this.Cart.length
      this.$emit('updateNum', num)
    },
    remove (moveItem) {
      let index = this.Cart.findIndex(p => p.id === moveItem)
      this.Cart.splice(index, 1)
      let num = this.Cart.length
      this.$emit('updateNum', num)
    }
  },
  filters: {
    truncate: function (string, value) {
      return string.substring(0, value) + '...'
    }
  }
}
</script>

<style lang="css">


/* Section right */
section.right {
    font-size: 1rem;
    width: 60vw;
}

.page-header {
    margin-top: 1%;
    margin-bottom: 2%;
    font-weight: lighter;
}

.book {
    display: flex;
    flex-flow: row wrap;
    padding-top: 2%;
    padding-bottom: 2%;
    border-top: solid 1px var(--light-grey-200);
    width: 55vw;
}

.book .thumbnail {
    margin-right: 3%;
}

.book .thumbnail img {
    max-width: 130px;
    width: 100%;
    max-height: 160px;
    height: 100%;
}

.book .body {
    width: 100%;
    max-width: 41vw;
}

.book .body .title a {
    color: var(--black)
}

.book .body .author, .book .body .author a{
    color: var(--light-grey-400);
    font-style: italic;
    font-size: 0.75rem
}

.book .body .author a:hover {
    color: var(--dark-blue)
}

.book .body .summary {
    width: 100%;
    min-width: 42vw;
    font-size: 0.9rem
}
.header {
      text-align: left;
}
.header header {
  margin-top: 10px
}
.author span {
    margin-left: 10px;
}
#price {
   font-weight:bold;
   color:red
}
</style>
