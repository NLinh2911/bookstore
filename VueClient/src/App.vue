<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
body {
    width: 100vw;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    margin: auto;
    background-color: var(--light-grey-200);
    box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
    --dark-blue: #2a3744;
    --light-blue: #abccdb;
    --white: #fff
}

.search {
    font-size: 1.2rem;
    height: 4vh;
    display: flex;
    flex-flow: row wrap;
    padding: 1%;
    align-items: center;
    background-color: var(--dark-blue);
}

.search a {
    text-decoration: none;
    color: var(--light-blue);
}

.search .left {
    width: 19.2vw;
    display: flex;
    justify-content: space-between;
}

.search .right {
    width: 53.8vw;
    text-align: right
}

:root {
    --dark-blue: #2a3744;
    --light-blue: #3d5064;
    --cherry-red: #c40000;
    --white: #fff;
    --black: #000;
    --light-grey-200: #EEEEEE;
    --light-grey-400: #BDBDBD
}

* {
    text-decoration: none;
    list-style-type: none;
}


.wrapper {
    width: 75vw;
    height: 100%;
    margin: auto;
    display: flex;
}

.container {
    width: 75vw;
    margin: auto;
    margin-top: 1%;
    display: flex;
    padding: 1% 0 1% 0;
    background-color: var(--white);
}


.paddingless {
    padding: 0
}

.marginless {
    margin: 0
}

/* Search Component */

#search .left {
    width: 50%;
    display: flex;
    justify-content: space-between
}

#search .left .nav {
    width: 100%;
}

#search .left .nav .nav-item {
    display: inline-block;
    width: 9rem;
    height: 100%;
    line-height: 100%;
    color: var(--light-grey-200);
}

#search .right {
    width: 54.8vw;
    text-align: right
}

#search {
    width: 100%;
    height: 4rem;
    margin: auto;
    font-size: 1rem;
    background-color: var(--dark-blue);
}


#search a {
    text-decoration: none;
    color: var(--light-blue);
}

#search .left ul li .dropbtn,
#search .left ul li .dropbtn a {
    background-color: transparent;
    width: 9rem;
    height: 100%;
    text-align: center;
    color: var(--light-grey-200) !important;
    font-size: 1rem;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
    display: inline-block;
    height: 100%;
}


.dropdown-content {
    display: none;
    text-align: left;
    font-size: .75rem;
    position: absolute;
    background-color: var(--dark-blue);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: var(--light-grey-200) !important;
    text-decoration: none;
    display: block;
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: .75rem;

}

.dropdown-content .category .sub-category:not(:last-child){
    border-bottom: 1px solid rgba(238, 238, 238, 0.2);
}


.dropbtn:hover, .dropdown-content a:hover {
    background-color: var(--light-blue) !important;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: var(--light-blue) !important;
}

.dropdown-content .category .sub-category {
    width: 15rem;
    max-width: 100%;
    position: relative;

}

.dropdown-content .category .sub-category > .category {
    display: none;
    left: 100%;
    top: 0
}

.dropdown-content .category .sub-category:hover > .category {
    display: block;
    position: absolute
}
</style>
