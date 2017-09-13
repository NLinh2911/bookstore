<template>
  <div class="pagination">
   <span v-for="page in Pages" :key="page.id"><a href="" @click="changePage"><router-link :to="{path:`/page/${page}`}" >{{page}}</router-link></a></span>
     <span v-for="page in Pages" v-if="page === currentPage" class="active" :key="page.id"  @click="changePage"><router-link :to="{path:`/page/${page}`}" >{{page}}</router-link></span>  
  </div>
</template>
<script>
export default {
  props: ['Pages'],
  data () {
    return {
      root: '',
      currentPage: this.$route.params.id
    }
  },
  methods: {
    changePage () {
      this.$emit('change')
    }
  }
}
</script>
<style>
 .pagination{
   margin: 5px;
 }
  .pagination span{
    margin-left: 5px;
    display: inline-block;
  }
.pagination span a {
    color: #ef3535;
}
.router-link-active{
     font-size: 0.8rem;
     font-weight: bolder;
      color: white;
}
</style>
