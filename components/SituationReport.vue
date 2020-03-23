<template>
  <section class="situation  container">
    <h2>
      COVID-19 Situation Report for {{ singleCountry.name }}<br>
      <span>{{ singleCountry.mostRecent.date }}</span>
    </h2>
    <div style="display: flex; justify-content: center;">
      <select id="country" v-model="selectedCountry">
        <option :value="null">
          Worldwide
        </option>
        <option value="" disabled>
          ---
        </option>
        <option
          v-for="country in allCountries"
          :key="country.name"
          :value="country.name"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <p>
      <strong>
        <template v-if="infectionPercentageDiff">
          <span :class="infectionTrendClass">
            Number of active cases has {{ infectionTrendMessage }} ({{ (infectionTrendClass === 'text-danger' ? 'up' : 'down') + ' ' + `${infectionPercentageDiff.toFixed(1)}%` }})
          </span>
        </template>
        <template v-else>
          Number of active cases remains unchaged
        </template>
      </strong>
    </p>
    <div class="details">
      <div class="detail">
        <img src="~/assets/img/virus.svg">
        <h4>{{ singleCountry.mostRecent.confirmed }}</h4>
        <p>Total Cases</p>
      </div>

      <div class="detail">
        <img src="~/assets/img/virus.svg">
        <h4>{{ `${singleCountry.mostRecent.confirmed - singleCountry.results[singleCountry.results.length - 2].confirmed}` }}</h4>
        <p>New Cases</p>
      </div>

      <div class="detail">
        <img src="~/assets/img/virus.svg">
        <h4>{{ singleCountry.mostRecent.deaths }}</h4>
        <p>Deaths</p>
      </div>

      <div class="detail">
        <img src="~/assets/img/virus.svg">
        <h4>{{ singleCountry.mostRecent.recovered }}</h4>
        <p>Recovered</p>
      </div>
    </div>

    <p>This might take several minutes to be updated,since Health Promotion Bureau is issuing verified data from reliable sources.</p>
  </section>
</template>

<script>
import gql from 'graphql-tag'
// import singleCountry from '~/gql/country'
import results from '~/gql/country'

export default {

  data () {
    return {
      selectedCountry: 'Ukraine'
    }
  },

  apollo: {
    // singleCountry: {
    //   prefetch: true,
    //   query: singleCountry
    // },
    results: {
      prefetch: true,
      query: results
    },
    allCountries: {
      query: gql`
      query getAllCountries{
        allCountries: countries{
          name
        }
      }
      `
    },
    singleCountry: {
      query: gql`
      query getSingleCountry($country: String){
        singleCountry: country(name: $country) {
          name
          results {
            date
            confirmed
            deaths
            recovered
          }
          mostRecent {
            date(format: "yyyy - MM - dd")
            confirmed
            deaths
            recovered
            growthRate
          }
        }
      }

      `,
      variables () {
        return {
          country: this.selectedCountry
        }
      }
    }

  },

  computed: {

    infectionPercentageDiff () {
      if (this.singleCountry.results.length > 1) {
        const current = this.singleCountry.results[this.singleCountry.results.length - 1].confirmed
        const previous = this.singleCountry.results[this.singleCountry.results.length - 2].confirmed
        return 100 * Math.abs((current - previous) / ((current + previous) / 2))
      }
      return 0
    },

    infectionTrend () {
      if (this.singleCountry.results.length > 1) {
        const current = this.singleCountry.results[this.singleCountry.results.length - 1].confirmed
        const previous = this.singleCountry.results[this.singleCountry.results.length - 2].confirmed
        return previous > current ? -1 : 1
      }
      return 0
    },

    infectionTrendMessage () {
      return this.infectionTrend > 0 ? 'increased' : this.infectionTrend < 0 ? 'decreased' : 'not enough data'
    },

    infectionTrendClass () {
      return this.infectionTrend > 0 ? 'text-danger' : this.infectionTrend < 0 ? 'text-success' : ''
    }
  }
}
</script>

<style lang="css" scoped>
.situation{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align:center;
}
h2{
    margin-top: 30px;
    margin-bottom: 30px;
}

h2 span{
    font-size: 1rem;
    margin-bottom: 30px;
}
.details{
    display: flex;
    justify-content: center;
    text-align:center;

    margin-bottom: 30px;
}

.details .detail{
    margin: 0 auto;
}

.details .detail h4{
    margin: 20px 0;
}

img{
    width: 120px;
}
</style>
