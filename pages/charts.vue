<template>
  <section>
    <div class="container">
      <h1>Charts</h1>
    </div>
    <SituationReport />

    <div
      v-if="results"
      class="container"
    >
      <h2>{{ results.length - 1 }} Affected Countries Sorted by Total Cases.</h2>
      <div class="allResults">
        <div
          v-for="result in results"
          :key="result.countryInfo._id"
          class="singleResult"
        >
          <img
            :src="result.countryInfo.flag"
            :alt="result.country"
          >
          <h3>{{ result.country }}</h3>
          <p>Confirmed Cases: {{ result.cases.toLocaleString() }} <span>Today: {{ result.todayCases.toLocaleString() }}</span></p>
          <p>Active Cases: {{ result.active.toLocaleString() }}</p>
          <p>Critical Cases: {{ result.critical.toLocaleString() }}</p>
          <p>Total Deaths: {{ result.deaths.toLocaleString() }} <span>Today: {{ result.todayDeaths.toLocaleString() }}</span> </p>
          <p>Recoveries: {{ result.recovered.toLocaleString() }}</p>
          <p>Cases Per One Million: {{ result.casesPerOneMillion.toLocaleString() }}</p>
          <p>Tests performed: {{ result.tests.toLocaleString() }}</p>
          <p>Tests Per One Million: {{ result.testsPerOneMillion.toLocaleString() }}</p>

          <p>Last Updated {{ $moment(result.updated).format('LLLL') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import ChartBar from '@/components/chart-bar'
// import ChartDoughnut from '@/components/chart-doughnut'
// import ChartLine from '@/components/chart-line'
import SituationReport from '~/components/SituationReport'

export default {
  components: {
    SituationReport
  },

  async fetch () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch('https://corona.lmao.ninja/countries?sort=cases', requestOptions,
      {
        headers: { 'Content-Type': 'application/json' }
      })
    const data = await response.json()
    this.results = data
  },

  fetchOnServer: false,

  data () {
    return {
      results: []
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: normal;
  font-size: 3.75rem;
  text-align: left;
  color: #fffefe;

  margin-bottom: 2rem;
}

h2 {
  font-weight: normal;
  font-size: 2rem;
  text-align: left;
  color: #ebedfa;

  margin-bottom: 1.5rem;
}
.allResults {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }

  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 1rem;

    @media screen and (max-width: 768px) {
      height: 160px;
    }
  }

    h3 {
      font-family: "AvenirNext-Bold";
      font-weight: normal;
      font-size: 1.6875rem;
      text-align: left;
      color: #fffefe;
    }

    p {
      font-family: "AvenirNext-Medium";
      font-weight: normal;
      font-size: 1.125rem;
      line-height: 30px;
      text-align: left;
      color: #ebedfa;
      margin-bottom: 24px;
    }
}
</style>
