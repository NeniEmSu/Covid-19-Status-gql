<template>
  <section
    id="stats"
    class="situation  container"
  >
    <div class="world-wide">
      <div class="death">
        <h4 v-if="$fetchState.pending">
          Fetching data...
        </h4>
        <h4 v-else-if="$fetchState.error">
          Error while fetching data: {{ $fetchState.error.message }}
        </h4>
        <h4 v-else>
          <span v-if="worldwide.deaths !== null">{{ `${worldwide.deaths.toLocaleString()}+` }}</span>
          <span v-else>{{ `${aggregated[1].deaths.toLocaleString()}+` }}</span>
        </h4>
        <p>Deaths Worldwide</p>
      </div>
      <div class="confirmed">
        <h4 v-if="$fetchState.pending">
          Fetching data...
        </h4>
        <h4 v-else-if="$fetchState.error">
          Error while fetching data: {{ $fetchState.error.message }}
        </h4>
        <h4 v-else>
          <span v-if="worldwide.cases !== null">{{ `${worldwide.cases.toLocaleString()}+` }}</span>
          <span v-else>{{ `${aggregated[1].confirmed.toLocaleString()}+` }}</span>
        </h4>

        <p>Confirmed Cases</p>
      </div>
      <div class="recovered">
        <h4 v-if="$fetchState.pending">
          Fetching data...
        </h4>
        <h4 v-else-if="$fetchState.error">
          Error while fetching data: {{ $fetchState.error.message }}
        </h4>
        <h4 v-else>
          <span v-if="worldwide.recovered !== null">{{ `${worldwide.recovered.toLocaleString()}+` }}</span>
          <span v-else>{{ `${aggregated[1].recovered.toLocaleString()}+` }}</span>
        </h4>
        <p>Recoveries</p>
      </div>
      <div class="live-update">
        <div class="heading">
          <div class="pulse" />
          <h2>
            LIVE UPDATE
          </h2>
        </div>
        <h6>{{ $moment(worldwide.updated).format('LLLL') }}</h6>
        <p>Updates might take a while, as Health Promotion Bureau is verifying data from reliable sources.</p>
      </div>
    </div>

    <h2>
      COVID-19 Situation Report for {{ singleCountry.name }}<br>
      <span>{{ singleCountry.mostRecent.date }}</span>
    </h2>
    <p>
      <strong>
        <template v-if="infectionPercentageDiff">
          <span :class="infectionTrendClass">
            Number of active cases has {{ infectionTrendMessage }} ({{ `${infectionPercentageDiff.toFixed(1)}%` }})
          </span>
        </template>
        <template v-else>
          Number of active cases remains unchaged
        </template>
      </strong>
    </p>
    <div class="country-select">
      <select
        id="country"
        v-model="selectedCountry"
      >
        <option
          value=""
          disabled
        >
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
        <h4>
          <animated-number
            :value="singleCountry.mostRecent.confirmed"
            :format-value="value => Math.floor(value)"
            :duration="animationSpeed"
          />
        </h4>
        <p>Total Cases</p>
      </div>

      <div class="detail blue">
        <div class="icon-container ">
          <i class="fas fa-ambulance" />
        </div>
        <h4>
          <animated-number
            :value="`${singleCountry.mostRecent.confirmed - singleCountry.results[singleCountry.results.length - 2].confirmed}`"
            :format-value="value => Math.floor(value)"
            :duration="animationSpeed"
            :delay="1000"
          />
        </h4>
        <p>New Cases</p>
        <small :class="infectionTrendClass">{{ (infectionTrendClass === 'red' ? 'More Cases' : infectionTrendClass === 'green' ? 'Less Cases' : '') }}</small>
      </div>

      <div class="detail red">
        <div class="icon-container ">
          <i class="fas fa-bed" />
        </div>
        <h4>
          <animated-number
            :value="singleCountry.mostRecent.deaths"
            :format-value="value => Math.floor(value)"
            :duration="animationSpeed"
            :delay="2000"
          />
        </h4>
        <p>Deaths</p>
        <small :class="singleCountry.mostRecent.deaths - singleCountry.results[singleCountry.results.length - 2].deaths < 1 ? 'green' : ''">{{ `+ ${singleCountry.mostRecent.deaths - singleCountry.results[singleCountry.results.length - 2].deaths}` }}</small>
      </div>

      <div class="detail green">
        <div class="icon-container ">
          <i class="fas fa-running" />
        </div>
        <h4>
          <animated-number
            :value="singleCountry.mostRecent.recovered === null ? singleCountry.results[singleCountry.results.length - 2].recovered : singleCountry.mostRecent.recovered"
            :format-value="value => Math.floor(value)"
            :duration="animationSpeed"
            :delay="3000"
          />
        </h4>
        <p>Recovered</p>
        <small>{{ `+ ${singleCountry.mostRecent.recovered === null ? singleCountry.results[singleCountry.results.length - 3].recovered : singleCountry.mostRecent.recovered - singleCountry.results[singleCountry.results.length - 2].recovered}` }}</small>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import AnimatedNumber from 'animated-number-vue'

export default {
  components: {
    AnimatedNumber
  },

  async fetch () {
    const response = await fetch('https://corona.lmao.ninja/all')
    const data = await response.json()
    this.worldwide = data
    const location = await fetch('https://freegeoip.app/json/')
    const userLocation = await location.json()
    this.selectedCountry = userLocation.country_name
  },

  fetchOnServer: false,

  data () {
    return {
      selectedCountry: 'Nigeria',
      animationSpeed: 1000,
      worldwide: []
    }
  },

  apollo: {
    allCountries: {
      query: gql`
      query getAllCountries {
        allCountries: countries {
          name
          mostRecent {
            confirmed
            deaths
            recovered
          }
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
            growthRate
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

    aggregated () {
      const aggregated = {}
      Object.keys(this.allCountries).forEach((index) => {
        Object.keys(this.allCountries[index]).forEach((mostRecent) => {
          if (!aggregated[mostRecent]) {
            aggregated[mostRecent] = { ...this.allCountries[index][mostRecent] }
          } else {
            aggregated[mostRecent].confirmed += this.allCountries[index][mostRecent].confirmed
            aggregated[mostRecent].deaths += this.allCountries[index][mostRecent].deaths
            aggregated[mostRecent].recovered += this.allCountries[index][mostRecent].recovered
          }
        })
      })

      return Object.keys(aggregated).map((key) => {
        return aggregated[key]
      })
    },

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
      if (this.singleCountry.results.length > 1) {
        return this.singleCountry.results[this.singleCountry.results.length - 1].growthRate >= this.singleCountry.results[this.singleCountry.results.length - 2].growthRate ? 'red' : this.singleCountry.results[this.singleCountry.results.length - 1].growthRate < this.singleCountry.results[this.singleCountry.results.length - 2].growthRate ? 'green' : ''
      }
      return ''
    }
  },

  watch: {
    selectedCountry (newSelectedCountry) {
      localStorage.selectedCountry = newSelectedCountry
    }
  },

  mounted () {
    if (localStorage.selectedCountry) {
      this.selectedCountry = localStorage.selectedCountry
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.situation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  margin-bottom: 120px;
}

.world-wide {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  text-align: center;

  margin-bottom: 80px;

  @media screen and (max-width: 986px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .death,
  .confirmed,
  .recovered {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;

    width: 240px;
    height: 180px;
    border-radius: 12px;
    border: 5px solid rgba(255, 255, 255, 0.28);
    box-shadow: 0px 8px 25px #4056d4;

    margin: 10px auto;
  }

  .death {
    background: #f42850;
  }

  .confirmed {
    background: #0841d5;
  }

  .recovered {
    background: #1cb142;
  }

  .live-update {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding: 0 15px;
    .heading {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 1rem;
      .pulse {
        width: 20px;
        height: 20px;
        background: #ff3e3e;
        border-radius: 50%;

        margin: auto 5px auto 0px;
      }

      h2 {
        font-family: "Gilroy";
        font-weight: normal;
        font-size: 24px;
        text-align: left;
        color: #fffefe;

        margin: auto 0;
      }

      h6 {
        font-family: AvenirNext-DemiBold;
        font-weight: normal;
        font-size: 18px;
        text-align: left;
        color: #fffefe;

        margin-bottom: 0;
      }

    }

    p {
        font-family: "AvenirNext-Medium";
        font-weight: normal;
        font-size: 18px;
        line-height: 30px;
        color: #ebedfa;
      }
  }
}

h2 {
  margin-top: 0;
  font-weight: 600;
}

h2 span {
  font-size: 1.5rem;

  margin-top: 0;
  font-weight: 600;
}

.details {
  display: flex;
  justify-content: center;
  text-align: center;

  @media screen and (max-width: 425px) {
    display: grid;
    text-align: center;
    justify-content: center;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}

.details .detail {
  margin: 0 auto;
}

.details .detail h4 {
  color: #fffefe;
}

.details .detail p {
  font-family: "Gilroy-ExtraBold", sans-serif;
}
.details .detail small {
 font-size: 14px;
}

.details .detail i {
  font-size: 25px;
  margin-bottom: 40px;
}

.green {
  // color: #50cd8a;
  color: #26dd54;
}

.red {
  // color: #f64a8f;
  color: #ff3e3e;
}

.yellow {
  // color: #fdb01a;
  color: #fece00;
}

.blue {
  // color: #0841d5;
  color: rgb(22, 31, 39);
}

.icon-container {
  border-radius: 50%;
  height: 60px;
  width: 60px;
  line-height: 68px;
  background: rgba(112, 82, 251, 0.241);
  margin: 0 auto 43px;
}

.green .icon-container {
  background: rgba(38, 221, 84, 0.241);
  // rgba(80, 205, 138, 0.141);
}

.red .icon-container {
  background: rgba(246, 74, 143, 0.241);
}

.yellow .icon-container {
  background: rgba(253, 176, 26, 0.241);
}

.blue .icon-container {
  // background: rgba(8, 65, 213, 0.241);
  background: rgba(22, 31, 39, 0.241);
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

.country-select {
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
}
</style>
