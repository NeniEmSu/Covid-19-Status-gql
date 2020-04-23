<template>
  <div>
    <TheHeader />
    <transition
      name="fade"
      mode="out-in"
    >
      <nuxt />
    </transition>
    <nuxt-link
      id="scroll-to-top"
      to=""
      class="scroll-to-top hide"
      @click.native="scrollToTop"
    >
      <span />
    </nuxt-link>
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
  },
  data () {
    return {
      lastScrollPosition: 0,
      loaded: false,
      countryData: [],
      countryDataTable: []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.$nextTick(function () {
      window.addEventListener('scroll', function () {
        const scrollRoTopButton = document.getElementById('scroll-to-top')
        const navClasses = scrollRoTopButton.classList
        if (document.documentElement.scrollTop <= 500) {
          if (navClasses.contains('hide') === false) {
            navClasses.toggle('show')
            navClasses.toggle('hide')
            navClasses.toggle('animated')
          }
        } else if (navClasses.contains('hide') === true) {
          navClasses.toggle('show')
          navClasses.toggle('hide')
          navClasses.toggle('animated')
        }
      })
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  // created () {
  //   this.countryData = this.$store.getters.reportForCountry(this.country)
  //   if (!this.countryData.length) {
  //     this.$store.dispatch('fetchReport')
  //       .then((res) => {
  //         const result = this.$store.getters.reportForCountry(this.country)[0]
  //         this.countryData = result
  //         this.countryDataTable = [...result[1]]
  //         this.loaded = true
  //       })
  //       // eslint-disable-next-line handle-callback-err
  //       .catch((error) => { })
  //   } else {
  //     this.countryData = this.countryData[0]
  //     this.countryDataTable = [...this.countryData[1]]
  //     this.loaded = true
  //   }
  // },
  // created () {
  //   this.$store.dispatch('fetchReport')
  //     .then((res) => {
  //       this.loaded = true
  //     })
  //     .catch((error) => {
  //     })
  // },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    }
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

color: #fefefe;

  scroll-behavior: smooth;
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
h6,
hr {
  font-family: "Gilroy-ExtraBold", sans-serif;
  color: #fffefe;
}

a {
  color: rgba(255, 208, 0, 1);

  &:hover {
    color: rgba(255, 208, 0, 0.85);
    text-decoration: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1000ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.scroll-to-top span {
  position: fixed;
  bottom: 3%;
  right: 3%;
  width: 20px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.28);
    box-shadow: 0px 8px 25px #4056d4;
    border-radius: 25px;
  box-sizing: border-box;
}

.scroll-to-top span::before {
  position: absolute;
  top: 6px;
  left: 50%;
  content: '';
  width: 4px;
  height: 4px;
  margin-left: -2px;
  background-color: #fff;
  border-radius: 100%;
  -webkit-animation: sdb10 2s infinite;
  animation: sdb10 2s infinite;
  box-sizing: border-box;
}

@keyframes sdb10 {
  0% {
    transform: translate(0, 12px);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0, 0px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes sdb10 {
  0% {
    -webkit-transform: translate(0, 12px);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0, 0px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.hide{
  display: none;
}

.show{
  display: block;
}

.animated {
  -webkit-animation-duration: 1s !important;
  animation-duration: 1s !important;
  -webkit-animation-fill-mode: both !important;
  animation-fill-mode: both !important;
}
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}
@keyframes #{fadeInDown} {
  0% {
    -webkit-transform: translate3d(0, -40px, 0);
    transform: translate3d(0, -40px, 0);
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
