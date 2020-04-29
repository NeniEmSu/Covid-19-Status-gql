<template>
  <section
    id="stats"
    class="situation  container"
  >
    <div class="world-wide">
      <div class="death">
        <b-overlay
          :show="$fetchState.pending"
          variant="transparent"
          opacity="0.5"
          blur="2px"
          rounded="sm"
        >
          <transition name="fade" mode="out-in">
            <div v-if="!$fetchState.pending">
              <h4>
                <span>{{ `${worldwide.deaths.toLocaleString()}+` }}</span>
              </h4>
              <p>Deaths Worldwide</p>
              <small>{{ `Today ${worldwide.todayDeaths.toLocaleString()}` }}</small>
            </div>
            <h4 v-else-if="$fetchState.error">
              Error while fetching data: {{ $fetchState.error.message }}
            </h4>
          </transition>
        </b-overlay>
      </div>

      <div class="confirmed">
        <b-overlay
          :show="$fetchState.pending"
          variant="transparent"
          opacity="0.5"
          blur="2px"
          rounded="sm"
        >
          <transition name="fade" mode="out-in">
            <div v-if="!$fetchState.pending">
              <h4>
                <span>{{ `${worldwide.cases.toLocaleString()}+` }}</span>
              </h4>
              <p>Confirmed Cases</p>
              <small> {{ worldwide.active.toLocaleString() }} Active <br>  {{ worldwide.critical.toLocaleString() }} Critical</small>
            </div>
            <h4 v-else-if="$fetchState.error">
              Error while fetching data: {{ $fetchState.error.message }}
            </h4>
          </transition>
        </b-overlay>
      </div>
      <div class="recovered">
        <b-overlay
          :show="$fetchState.pending"
          variant="transparent"
          opacity="0.5"
          blur="2px"
          rounded="sm"
        >
          <transition name="fade" mode="out-in">
            <div v-if="!$fetchState.pending">
              <h4>
                <span>{{ `${worldwide.recovered.toLocaleString()}+` }}</span>
              </h4>
              <p>Recoveries</p>
              <small>{{ `${worldwide.tests.toLocaleString()} Tested` }}</small>
            </div>
            <h4 v-else-if="$fetchState.error">
              Error while fetching data: {{ $fetchState.error.message }}
            </h4>
          </transition>
        </b-overlay>
      </div>
      <div class="live-update">
        <div class="heading">
          <div class="pulse" />
          <h2>
            LIVE UPDATE
          </h2>
        </div>
        <h6>{{ $moment(worldwide.updated).format('LLLL') }}</h6>
        <p>Updates might take a while due to verification from reliable sources.</p>
      </div>
    </div>
    <div v-if="singleCountry">
      <h2>
        COVID-19 Situation Report for {{ singleCountry.name }}<br>
        <span>{{ singleCountry.mostRecent.date }}</span>
      </h2>
      <p>
        <strong>
          <b-progress
            :value="(singleCountry.mostRecent.recovered * 100) / singleCountry.mostRecent.confirmed"
            variant="success"
            striped
            :animated="animate"
            :precision="2"
            show-value
            class="w-25 mx-auto"
          />
        </strong>
      </p>
    </div>

    <div
      v-if="allCountries"
      class="country-select"
    >
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

    <div
      v-if="singleCountry"
      class="details"
    >
      <div class="detail yellow">
        <div class="icon-container ">
          <i class="fas fa-hospital-alt" />
        </div>
        <h4>
          <animated-number
            :value="singleCountry.mostRecent.confirmed"
            :format-value="value => Math.floor(value).toLocaleString()"
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
            :format-value="value => Math.floor(value).toLocaleString()"
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
            :format-value="value => Math.floor(value).toLocaleString()"
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
            :format-value="value => Math.floor(value).toLocaleString()"
            :duration="animationSpeed"
            :delay="3000"
          />
        </h4>
        <p>Recovered</p>
        <small>{{ `+ ${singleCountry.mostRecent.recovered === null ? singleCountry.results[singleCountry.results.length - 3].recovered : singleCountry.mostRecent.recovered - singleCountry.results[singleCountry.results.length - 2].recovered}` }}</small>
      </div>
    </div>

    <div class="form-group text-left w-100 mt-3">
      <label for="timeFrame">Showing patern of Changes for past {{ timeFrame }} days </label>
      <select id="timeFrame" v-model="timeFrame" class="form-control w-25" name="timeFrame">
        <option v-for="(item, index) in noOfIncrements" :key="index" :value="item * 5">
          {{ item * 5 }}
        </option>
      </select>
    </div>

    <div class="charts">
      <chartjs-line
        id="confirmed"
        :backgroundcolor="confirmedChart.datasets[0].backgroundColor"
        :bordercolor="confirmedChart.datasets[0].borderColor"
        :beginzero="beginZero"
        :bind="true"
        :responsive="true"
        :font-color="confirmedChart.datasets[0].borderColor"
        :data="confirmedChart.datasets[0].data"
        :datalabel="confirmedChart.datasets[0].label"
        :labels="confirmedChart.labels"
      />
      <chartjs-line
        id="recovered"
        :backgroundcolor="recoveredChart.datasets[0].backgroundColor"
        :bordercolor="recoveredChart.datasets[0].borderColor"
        :beginzero="beginZero"
        :bind="true"
        :responsive="true"
        :data="recoveredChart.datasets[0].data"
        :datalabel="recoveredChart.datasets[0].label"
        :labels="recoveredChart.labels"
      />
      <chartjs-line
        id="deaths"
        :backgroundcolor="deathChart.datasets[0].backgroundColor"
        :bordercolor="deathChart.datasets[0].borderColor"
        :beginzero="beginZero"
        :bind="true"
        :responsive="true"
        :data="deathChart.datasets[0].data"
        :datalabel="deathChart.datasets[0].label"
        :labels="deathChart.labels"
      />
      <chartjs-line
        id="infected"
        :backgroundcolor="infectedChart.datasets[0].backgroundColor"
        :bordercolor="infectedChart.datasets[0].borderColor"
        :beginzero="beginZero"
        :bind="true"
        :responsive="true"
        :data="infectedChart.datasets[0].data"
        :datalabel="infectedChart.datasets[0].label"
        :labels="infectedChart.labels"
      />
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import AnimatedNumber from 'animated-number-vue'

const getInitialLegends = () => {
  const defaults = {
    confirmed: true,
    recovered: true,
    deaths: true,
    infected: true
  }
  return defaults
}

// eslint-disable-next-line no-unused-vars
const ukrineData = 'http://coronavirus19.com.ua/ajax/ukraine-stat?_=1586118973182'

export default {
  components: {
    AnimatedNumber
  },

  async fetch () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch('https://corona.lmao.ninja/v2/all', requestOptions)
    const data = await response.json()
    this.worldwide = data
    const location = await fetch('https://freegeoip.app/json/')
    const userLocation = await location.json()
    this.selectedCountry = userLocation.country_name || 'Nigeria'
  },

  fetchOnServer: false,

  data () {
    return {
      bgColor: '#81894e',
      beginZero: true,
      borderColor: '#81894e',
      selectedCountry: 'Ukraine',
      animationSpeed: 1000,
      worldwide: [],
      statesInUa: [],
      animate: true,
      legends: getInitialLegends(),
      timeFrame: 60
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
          country: this.selectedCountry || 'Nigeria'
        }
      }
    }

  },

  computed: {

    options () {
      return {
        animation: {
          duration: this.animationSpeed
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          onClick: (event, legend) => {
            const legends = { ...this.legends }
            switch (legend.text) {
              case 'Confirmed':
                legends.confirmed = !legends.confirmed
                break
              case 'Recovered':
                legends.recovered = !legends.recovered
                break
              case 'Deaths':
                legends.deaths = !legends.deaths
                break
              case 'Infected *':
                legends.infected = !legends.infected
                break
              default:
                break
            }
            this.legends = legends
            return false
          },
          labels: {
            fontColor: '#fefefe'
          },
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            type: 'linear',
            ticks: {
              precision: 0,
              fontColor: '#fefefe'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#fefefe'
            }
          }]
        }
      }
    },

    confirmed () {
      return this.singleCountry.results.map((stat) => {
        return stat.confirmed
      })
    },

    trend () {
      return this.confirmed.map((confirmed, i) => {
        return confirmed - (this.deaths[i]) - (this.recovered[i])
      })
    },

    deaths () {
      return this.singleCountry.results.map((stat) => {
        return stat.deaths
      })
    },

    recovered () {
      return this.singleCountry.results.map((stat) => {
        return stat.recovered
      })
    },

    dates () {
      return this.singleCountry.results.map((stat) => {
        return stat.date
      })
    },

    noOfIncrements () {
      return (Math.ceil(this.dates.length / 5) * 5) / 5
    },

    confirmedChart () {
      return {
        labels: this.dates.slice(this.timeFrame === 0 || this.timeFrame >= this.dates.length - 1 ? 0 : this.dates.length - this.timeFrame, this.dates.length),

        datasets: [
          {
            label: 'Confirmed',
            borderColor: '#FECE00',
            backgroundColor: 'rgba(52,152,221, 0.3)',
            data: this.confirmed.slice(this.timeFrame === 0 || this.timeFrame >= this.confirmed.length - 1 ? 0 : this.confirmed.length - this.timeFrame, this.confirmed.length)
          }
        ]
      }
    },
    recoveredChart () {
      return {
        labels: this.dates.slice(this.timeFrame === 0 || this.timeFrame >= this.dates.length - 1 ? 0 : this.dates.length - this.timeFrame, this.dates.length),

        datasets: [
          {
            label: 'Recovered',
            borderColor: 'rgb(46,204,119)',
            backgroundColor: 'rgba(46,204,119, 0.3)',
            data: this.recovered.slice(this.timeFrame === 0 || this.timeFrame >= this.recovered.length - 1 ? 0 : this.recovered.length - this.timeFrame, this.recovered.length)
          }
        ]
      }
    },
    deathChart () {
      return {
        labels: this.dates.slice(this.timeFrame === 0 || this.timeFrame >= this.dates.length - 1 ? 0 : this.dates.length - this.timeFrame, this.dates.length),

        datasets: [
          {
            label: 'Deaths',
            borderColor: '#FF3e3e',
            backgroundColor: 'rgba(231,76,51, 0.3)',
            data: this.deaths.slice(this.timeFrame === 0 || this.timeFrame >= this.deaths.length - 1 ? 0 : this.deaths.length - this.timeFrame, this.deaths.length)
          }
        ]
      }
    },

    infectedChart () {
      return {
        labels: this.dates.slice(this.timeFrame === 0 || this.timeFrame >= this.dates.length - 1 ? 0 : this.dates.length - this.timeFrame, this.dates.length),
        datasets: [
          {
            id: 'infected',
            label: 'Infected *',
            borderColor: 'rgb(22, 31, 39)',
            backgroundColor: 'rgba(155,89,187,0.3)',
            data: this.trend.slice(this.timeFrame === 0 || this.timeFrame >= this.trend.length - 1 ? 0 : this.trend.length - this.timeFrame, this.trend.length)
          }
        ]
      }
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
   display: flex;
  justify-content: space-evenly;
  column-gap: 20px;
  text-align: center;
  flex-wrap: wrap;

  margin-bottom: 80px;

  .death,
  .confirmed,
  .recovered,
  .live-update {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;

    max-width: 240px;
    min-width: 240px;
    width: 100%;

    margin: 10px auto;
  }

  .death,
  .confirmed,
  .recovered {
    height: 180px;
    border-radius: 12px;
    border: 5px solid rgba(255, 255, 255, 0.28);
    box-shadow: 0px 8px 25px #4056d4;

    p{
      margin-bottom: 10px;
    }
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
        color: rgb(255, 254, 254);

        margin: auto 0;
      }

      h6 {
        font-family: "AvenirNext-DemiBold";
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

.charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
  // justify-content: center;
  // text-align: center;
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
