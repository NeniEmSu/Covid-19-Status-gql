<template>
  <div>
    <TheHeader />
    <div class="container hero-wraper">
      <TheHero />
      <nuxt-link
        v-scroll-to="{
          el: '#stats',
          container: 'body',
          duration: 500,
          easing: 'linear',
          offset: -20,
          force: true,
          cancelable: true,
        }"
        class="scroll-to"
        to=""
      >
        <!-- <div>
          scroll
        </div>

        <svg
          id="_48px_minimal-down"
          data-name="48px_minimal-down"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="10"
          viewBox="0 0 18 10"
        >
          <path
            id="Path"
            d="M9,10a.777.777,0,0,1-.557-.236L0,1.139,1.115,0,9,8.055,16.885,0,18,1.139,9.557,9.764A.777.777,0,0,1,9,10Z"
            fill="#8b9fff"
          />
        </svg> -->
        <div class="chevron-container">
          <div class="chevron" />
          <div class="chevron" />
          <div class="chevron" />
          <div class="text">
            Scroll
          </div>
        </div>
      </nuxt-link>
    </div>

    <nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheHero from '~/components/TheHero'
import TheFooter from '~/components/TheFooter'
export default {
  components: {
    TheHeader,
    TheHero,
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
}

@font-face {
  font-family: "Gilroy-ExtraBold";
  src: url("~assets/fonts/Gilroy-ExtraBold.otf") format("opentype");
}

body {
  font-family: "Poppins", sans-serif;
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
  font-family: "Gilroy-ExtraBold" "Poppins", sans-serif;
  color: #fffefe;
}

a {
  color: #fece00;
}

.container.hero-wraper {
  position: relative;
  .scroll-to {
    font-family: "AvenirNext-DemiBold";
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    color: rgb(139, 159, 255);

    position: absolute;
    left: 0;
    top: 85%;

    text-decoration: none;

    @media screen and (max-width: 990px) {
      left: 50%;
      transform: translateX(-50%);
    }

    @media screen and (max-width: 768px) {
      top: 95%;
    }

    .chevron-container {
      position: relative;
      width: 24px;
      height: 24px;
      z-index: 16;
    }
    .chevron {
      position: absolute;
      width: 28px;
      height: 8px;
      opacity: 0;
      transform: scale3d(0.5, 0.5, 0.5);
      animation: move 3s ease-out infinite;
      margin-top: 60px;

      @media screen and (max-width: 768px) {
         margin-top: 20px;
      }
    }
    .chevron:first-child {
      animation: move 3s ease-out 1s infinite;
    }
    .chevron:nth-child(2) {
      animation: move 3s ease-out 2s infinite;
    }
    .chevron:before,
    .chevron:after {
      content: " ";
      position: absolute;
      top: 0;
      height: 100%;
      width: 51%;
      background: rgb(139, 159, 255);
    }
    .chevron:before {
      left: 0;
      transform: skew(0deg, 30deg);
    }
    .chevron:after {
      right: 0;
      width: 50%;
      transform: skew(0deg, -30deg);
    }
    @keyframes move {
      25% {
        opacity: 1;
      }
      33% {
        opacity: 1;
        transform: translateY(30px);
      }
      67% {
        opacity: 1;
        transform: translateY(40px);
      }
      100% {
        opacity: 0;
        transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
      }
    }

    .chevron-container div.text {
      transform: rotate(90deg);
      margin-left: 2px;

      text-decoration: none;

      @media screen and (max-width: 768px) {
        transform: rotate(0deg);
        margin-top: 40px;
        margin-left: -15px;
      }
    }
  }
}
</style>
