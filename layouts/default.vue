<template>
  <div>
    <TheHeader />
    <div class="container">
      <TheHero />
    </div>
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheHero from '~/components/TheHero'
export default {
  components: {
    TheHeader,
    TheHero
  }
}
</script>

<style>
html {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: 'Gilroy-ExtraBold';
  src: url("~assets/fonts/Gilroy-ExtraBold.otf") format("opentype");
}

body{
  font-family: "Gilroy-ExtraBold", "Poppins", sans-serif;
  font-size: 16px;
  color: #FEFEFE;
  background-color: #5268E7;

  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
}

h1,h2,h3,h4,h4,h5,h6{
  color: #FFFEFE;
}
</style>
