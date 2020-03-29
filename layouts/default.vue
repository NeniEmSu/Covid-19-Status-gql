<template>
  <div>
    <TheHeader />
    <transition name="fade" mode="out-in">
      <nuxt />
    </transition>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'
export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
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

  // @media screen and (max-width: 768px) {
  //   font-size: 14px;
  // }
}

@font-face {
  font-family: "Gilroy-ExtraBold";
  src: url("~assets/fonts/Gilroy-ExtraBold.otf") format("opentype");
}

@font-face {
  font-family: "Gilroy-Light";
  src: url("~assets/fonts/Gilroy-Light.otf") format("opentype");
}

@font-face {
  font-family: "AvenirNext-Bold";
  src: url("~assets/fonts/AvenirNext-Bold.ttf") format("TrueType");
}

@font-face {
  font-family: "AvenirNext-DemiBold";
  src: url("~assets/fonts/AvenirNext-DemiBold.ttf") format("TrueType");
}

@font-face {
  font-family: "AvenirNext-Medium";
  src: url("~assets/fonts/AvenirNext-Medium.ttf") format("TrueType");
}

body {
  font-family: "AvenirNext-Medium", sans-serif;
  font-size: 16px;
  color: #fefefe;
  background-color: #5268e7;

  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(128, 128, 128);
  border-radius: 2.5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(139, 159, 255);
  border-radius: 2.5px;
}

h1,
h2,
h3,
h4,
h4,
h5,
h6 {
  font-family: "Gilroy-ExtraBold", sans-serif;
  color: #fffefe;
}

a {
  color: rgba(255, 208, 0, 1);

  &:hover{
    color: rgba(255, 208, 0, 0.85);
    text-decoration: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1000ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
