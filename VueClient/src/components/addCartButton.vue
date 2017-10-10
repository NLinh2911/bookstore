<template>
<div>
   <button v-if="isAdding" type="submit" @click="addToCart(item)" id="addToCart"><i class="fa fa-cart-plus"></i>  Add to Cart</button>
   <button v-if="!isAdding" @click="removeFromCart" id="removeToCart"><i class="fa fa-trash"></i>  Remove from Cart</button>
  </div>
</template>
<script>
 export default {
   props: ['item'],
   data () {
     return {
       isAdding: true
     }
   },
   methods: {
     addToCart (index) {
       this.$emit('addCart', index)
       this.isAdding = false
     },
     removeFromCart (index) {
       this.$emit('removeCart', index)
       this.isAdding = true
     }
   }
 }
</script>
<style coped>

#addToCart{
    background: #EFDB06;
    color:black;
    border: 1px solid #F9E610;
       padding: 8px 12px;
       margin-top: 15px;
       cursor: pointer;
}
#addToCart:hover{
    background: #fff36e;
    border: 1px solid #fff36e
}
#removeToCart{
     background: #ff3d00;
    color:white;
    border: 1px solid #F9E610;
       padding: 8px 12px;
       margin-top: 15px;
       cursor: pointer; 
}
#removeToCart:hover{
  background: #ff3d00;
}
</style>