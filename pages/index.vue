<template>
  <div>
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
    <SituationReport />
    <EmergencyLine />
    <TopHeadlines />
    <section class="container">
      <h2>Flattening the Curve</h2>
      <p>
        COVID-19 / Coronavirus has led to a pandemic that is threatening every country today. The promising strategy
        to
        limit the damage caused by this pandemic is to flatten the curve.
      </p>
      <figure class="figure-container">
        <img alt="representation of flattening the curve of COVID-19 epidemic" class="curve-gif" src="~/assets/img/covid-flattening-the-curve.gif">
        <figcaption class="fig-text">
          Source: <a href="https://commons.wikimedia.org/wiki/File:Covid-19-curves-graphic-social-v3.gif">Wikipedia</a>
        </figcaption>
      </figure>
      <h4>
        What is an epidemic curve?
      </h4>
      <p>
        During any pandemic, healthcare resources like hospitals, ICU beds, and healthcare staff can be overwhelmed
        by
        the more number of patients, beyond the baseline number of patients who are already being cared for by the
        healthcare system. An epidemic curve is drawn to visualize the progress of a disease outbreak over time.
        This curve gives us a brief regarding the number of new outbreak cases by date of onset of the disease and
        hence
        the overall shape of the curve can reveal the type of outbreak we're dealing with.
      </p>

      <h4>
        Healthcare capacity line:
      </h4>
      <p>
        The horizontal line represents the capacity of the country’s healthcare system. This capacity can be defined
        as
        the number of beds, staffing, and other measures available for patient care. Today, due to COVID-19 most of
        the
        countries are already operating close to the capacity line and the curve posses a threat of crossing this
        line
        as the virus spreads very rapidly.
      </p>

      <h4>
        What happens when the line is crossed?
      </h4>
      <p>
        When the epidemic curve crosses the healthcare capacity line, the healthcare system can no longer meet the
        needs
        of COVID-19 patients and the other types of patients. At this point, people may not get the best care and
        the
        mortality rate starts to rise rapidly.
      </p>
      <h4>
        What is flattening the curve?
      </h4>
      <p>
        A large number of lives can be saved by just ensuring that people get sick at a slower rate. This is termed
        as
        flattening the epidemic curve. A flattened curve indicates that the same number of people ultimately get
        infected with coronavirus but spread over a longer period which leads to a less stressed health care system.
      </p>

      <h4>
        When does flattening the COVID-19 epidemic curve take place?
      </h4>
      <p>
        The most important key factor to flatten the curve is social distancing. The objective of social distancing
        or
        self-isolation is to reduce the probability of close contact between persons carrying an infection, and
        others
        who are not infected, thus minimizing the virus transmission. This is the underlying reason why governments
        are
        closing schools, non-critical businesses, social/sports events and other places where a ton people gather.
      </p>

      <h4>
        Can social distancing alone flatten the curve?
      </h4>
      <p>
        By limiting interactions between individuals, we can limit the spread of the disease but that doesn’t mean
        it is
        the only effective way to flatten the curve. There are several other factors that you can do to aid flatten
        the
        curve such as practicing good hygiene by washing your hands, using sanitizers, cleaning frequently touched
        surfaces and self-isolating in confirmed and suspected cases.
      </p>

      <h4>
        How can we help in flattening the curve?
      </h4>
      As the severity of COVID-19 rises, it's clear that our best option is to flatten the epidemic curve. So here
      is
      the list of things every individual is recommended to follow :
      <ul>
        <li>Wash your hands as frequently as you can. </li>
        <li>Practice efficient social distancing.</li>
        <li>Stay home.</li>
        <li>Proper usage of sanitizers.</li>
        <li>Don’t go for hospitals unless necessary.</li>
        <li>
          Don’t overbuy essential medical supplies like N95 masks which are required by healthcare providers
          while
          treating patients.
        </li>
        <li>Most importantly, <b>don't panic!</b></li>
      </ul>
      <figure class="figure-container">
        <img alt="Recommendations by WHO to help in flattening the curve of COVID-19 epidemic" class="who-recommendation" src="~/assets/img/flattening-the-curve-covid.jpg">
        <figcaption class="fig-text">
          Source: <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">WHO</a>
        </figcaption>
      </figure>
      <p class="text-center blockquote">
        " Let's all unite against the COVID-19 pandemic and fight ourselves out of the difficult times."
      </p>
    </section>
  </div>
</template>

<script>
import singleCountry from '~/gql/country'
import TheHero from '~/components/TheHero'
import SituationReport from '~/components/SituationReport'
import EmergencyLine from '~/components/EmergencyLine'
import TopHeadlines from '~/components/TopHeadlines'
export default {
  components: {
    TheHero,
    EmergencyLine,
    SituationReport,
    TopHeadlines
  },
  apollo: {
    singleCountry: {
      prefetch: true,
      query: singleCountry
    }
  }
}
</script>

<style lang="scss">
  img{
    width: auto;
    max-width: 100%;
    margin: auto;
  }

  li {
    margin-bottom: 5px;
    margin-left: 30px;
  }

  p {
    margin-bottom: 20px;
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
    left: 12px;
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
