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

body{
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: #797687;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
}

h1,h2,h3,h4,h4,h5,h6{
  margin-bottom: 10px;
  color: #2b2350;
}
</style>
