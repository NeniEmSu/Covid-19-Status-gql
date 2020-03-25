<template>
  <section
    id="hero"
    class="row"
  >
    <b-modal
      id="modal-1"
      size="lg"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      class="text-danger"
      hide-footer
      title="Learn how to stay safe"
    >
      <div class="embed-responsive embed-responsive-16by9">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/1APwq1df6Mw"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </b-modal>
    <div class="text-details col-lg-4 col-md-5">
      <p class="super-heading">
        188+ Countries Are Effected By
      </p>
      <h1>CORONA</h1>
      <p class="explanation">
        The Virus was first reported in wuhan, Hubel china on 17 November 2019, and on 11 March 2020,the world healtch organization (WHO) Declared the outbreak a pandmic.
      </p>
    </div>
    <div class="offset-lg-1" />
    <div class="image-section col-lg-7 col-md-7">
      <div class="img-container">
        <img
          src="~/assets/img/6316.png"
          alt=""
        >
        <svg
          v-b-modal.modal-1
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="105"
          height="105"
          viewBox="0 0 105 105"
        >
          <defs>
            <filter
              id="Oval"
              x="0"
              y="0"
              width="105"
              height="105"
              filterUnits="userSpaceOnUse"
            >
              <feOffset
                dy="5"
                input="SourceAlpha"
              />
              <feGaussianBlur
                stdDeviation="5"
                result="blur"
              />
              <feFlood flood-color="#475cd6" />
              <feComposite
                operator="in"
                in2="blur"
              />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g
            id="Play"
            transform="translate(15 10)"
          >
            <g
              transform="matrix(1, 0, 0, 1, -15, -10)"
              filter="url(#Oval)"
            >
              <circle
                id="Oval-2"
                data-name="Oval"
                cx="37.5"
                cy="37.5"
                r="37.5"
                transform="translate(15 10)"
                fill="#fece00"
              />
            </g>
            <g
              id="_48px_button-play"
              data-name="48px_button-play"
              transform="translate(31 25)"
            >
              <path
                id="Path"
                d="M.692,26A.688.688,0,0,1,0,25.316V.684A.683.683,0,0,1,.383.072a.7.7,0,0,1,.725.065L17.723,12.453a.679.679,0,0,1,0,1.095L1.108,25.863A.694.694,0,0,1,.692,26Z"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
        <h2>COVID - <span>19</span></h2>
        <p>Learn how to stay safe</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      info: 'Hi i\'m COVID-19 a disease caused by the novel coronavirus, I could not be called “lethal” as the lethality is 3,4%'
    }
  }
}
</script>
<style lang="scss" scoped>
@import url(//db.onlinewebfonts.com/c/23a52005216dca8d403521d06834f924?family=AvenirNextW10-Medium);
#hero {
  display: flex;
  width: 100vw;

  height: auto;

  justify-content: center;
  align-items: center;

  margin-bottom: 120px;
}

.text-details {
  width: 300px;
  p.super-heading {
    font-family: "AvenirNext-Medium";
    font-weight: normal;
    font-size: 20px;
    text-align: left;
    color: #ebedfa;

    @media screen and (max-width: 425px) {
      font-size: 18px;
    }
  }

  h1 {
    font-family: "Gilroy-ExtraBold";
    font-weight: normal;
    font-size: 110px;
    text-align: left;
    color: #fffefe;

    @media screen and (max-width: 1110px) {
      font-size: 95px;
    }

    @media screen and (max-width: 768px) {
      font-size: 90px;
    }

    @media screen and (max-width: 425px) {
      font-size: 60px;
    }
  }

  p.explanation {
    font-family: "AvenirNext-Medium";
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    text-align: left;
    color: #ebedfa;

    @media screen and (max-width: 425px) {
      font-size: 16px;
      line-height: 24px;
    }
  }
}

.image-section {
  .img-container {
    border-radius: 50%;

    position: relative;

    display: flex;
    justify-content: center;
    text-align: center;

    width: 540px;
    height: 540px;
    background: linear-gradient(#5268e7 0%, #3e54d2 100%);
    border: 1px solid #707070;

    padding: calc((540px - 360px) / 2);

    @media screen and (max-width: 990px) {
      width: 260px;
      height: 260px;
      background: linear-gradient(#5268e7 0%, #3e54d2 100%);
      border: 1px solid #707070;

      margin: auto;

      padding: calc((260px - 180px) / 2);
    }

    img {
      height: 360px;
      width: 360px;

      border-radius: 50%;
      border: 2px solid;

      border-top-color: transparent;
      border-right-color: #fece00;
      border-bottom: transparent;
      border-left-color: #fece00;

      @media screen and (max-width: 990px) {
      height: 180px;
      width: 180px;
    }
    }

    svg {
      width: 75px;
      height: 75px;

      position: absolute;
      top: 73%;
      left: 25%;

      cursor: pointer;
      outline: none;

      @media screen and (max-width: 990px) {
      width: 35px;
      height: 35px;
    }
    }

    h2 {
      font-family: "Gilroy-ExtraBold";
      font-weight: normal;
      font-size: 34px;
      text-align: left;

      position: absolute;
      top: 50%;
      right: -30px;

      transform: rotate(90deg);
      span {
        color: #fece00;
      }

      @media screen and (max-width: 990px) {
      font-size: 16px;

      right: -15px;
    }
    }
    p {
      font-family: "AvenirNext-Medium";
      font-weight: normal;
      font-size: 20px;
      line-height: 34px;
      text-align: left;
      color: #fff;

      position: absolute;
      top: 84%;
      left: 30%;

      @media screen and (max-width: 990px) {
      font-size: 14px;
      line-height: 20px;

      left: 25%;
    }
    }
  }
}
</style>
