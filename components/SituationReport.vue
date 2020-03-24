<template>
  <section class="situation  container">
    <h2>
      COVID-19 Situation Report for {{ singleCountry.name }}<br>
      <span>{{ singleCountry.mostRecent.date }}</span>
    </h2>
    <p>
      <strong>
        <template v-if="infectionPercentageDiff">
          <span :class="infectionTrendClass">
            Number of active cases has {{ infectionTrendMessage }} ({{ (infectionTrendClass === 'red' ? 'up' : 'down') + ' ' + `${infectionPercentageDiff.toFixed(1)}%` }})
          </span>
        </template>
        <template v-else>
          Number of active cases remains unchaged
        </template>
      </strong>
    </p>
    <div class="country-select">
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
    <div class="details">
      <div class="detail yellow">
        <div class="icon-container ">
          <i class="fas fa-hospital-alt" />
        </div>
        <h4>{{ singleCountry.mostRecent.confirmed }}</h4>
        <p>Total Cases</p>
      </div>

      <div class="detail red">
        <div class="icon-container ">
          <i class="fas fa-ambulance" />
        </div>
        <h4>{{ `${singleCountry.mostRecent.confirmed - singleCountry.results[singleCountry.results.length - 2].confirmed}` }}</h4>
        <p>New Cases</p>
      </div>

      <div class="detail text-danger">
        <div class="icon-container ">
          <i class="fas fa-bed" />
        </div>
        <h4>{{ singleCountry.mostRecent.deaths }}</h4>
        <p>Deaths</p>
      </div>

      <div class="detail green">
        <div class="icon-container ">
          <i class="fas fa-running" />
        </div>
        <h4>{{ singleCountry.mostRecent.recovered }}</h4>
        <p>Recovered</p>
      </div>
    </div>

    <p>This might take several minutes to be updated,since Health Promotion Bureau is issuing verified data from reliable sources.</p>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {

  data () {
    return {
      selectedCountry: 'Ukraine'
    }
  },

  apollo: {
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
      return this.infectionTrend > 0 ? 'red' : this.infectionTrend < 0 ? 'green' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.situation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align:center;
}

h2 {
    margin-top: 0;
    font-weight: 600;
    color: #2b2350;
}

h2 span {
    font-size: 1.5rem;

    margin-top: 0;
    font-weight: 600;
    color: #2b2350;
}

.details {
    display: flex;
    justify-content: center;
    text-align:center;

    margin-bottom: 30px;
}

.details .detail {
    margin: 0 auto;
}

.details .detail h4 {
  color: inherit;
}

.details .detail i {
  font-size: 25px;
   margin-bottom: 40px;
}

.green {
  color: #50cd8a;
}

.red {
  color: #f64a8f;
}

.yellow {
  color: #fdb01a;
}

.icon-container {
    border-radius: 10px;
    height: 60px;
    width: 60px;
    line-height: 68px;
    background: rgba(112, 82, 251, 0.141);
    margin: 0 auto 43px;
}

.green .icon-container {
    background: rgba(80, 205, 138, 0.141);
}

.red .icon-container {
    background: rgba(246, 74, 143, 0.141);
}

.yellow .icon-container {
    background: rgba(253, 176, 26, 0.141);
}

select {
    color: #161f27;
    background-color: rgb(231, 226, 226);
    font-size: inherit;
    margin-right: 6px;
    margin-bottom: 6px;
    padding: 10px;
    border: none;
    border-radius: 6px;
    outline: none;
}

.country-select{
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
}

</style>
