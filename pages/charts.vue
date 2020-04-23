<template>
  <section>
    <div class="container">
      <h1>Charts</h1>
    </div>
    <SituationReport />
    <div v-if="results" class="container">
      <h2>
        {{ results.length }} Affected Countries
      </h2>
      <p>Sorted By: {{ sortBy }} in {{ sortDesc ? 'Descending' : 'Ascending' }} order. <small>Updated: {{ $moment(lastUpdated[0]).format('LLLL') }}</small></p>

      <b-table
        striped
        hover
        dark
        responsive
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sticky-header="600px"
        :items="items"
      >
        <template v-slot:thead-top="">
          <b-tr>
            <b-th colspan="3" />
            <b-th
              colspan="4"
              variant="secondary"
            >
              Cases
            </b-th>
            <b-th
              variant="primary"
              colspan="3"
            >
              Outcome
            </b-th>
            <b-th colspan="2" variant="success">
              Testing
            </b-th>
          </b-tr>
        </template>
        <template v-slot:cell(flag)="data">
          <img
            class="table-flag"
            :src="data.item.flag"
            :alt="data.item.Country"
          >
        </template>
      </b-table>
    </div>
    <ukraineCases />
  </section>
</template>

<script>
import SituationReport from '~/components/SituationReport'
import ukraineCases from '~/components/ukraine-cases'

export default {
  components: {
    SituationReport,
    ukraineCases
  },

  async fetch () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch('https://corona.lmao.ninja/v2/countries?sort=cases', requestOptions,
      {
        headers: { 'Content-Type': 'application/json' }
      })
    const data = await response.json()
    this.results = data
  },

  fetchOnServer: false,

  data () {
    return {
      results: [],
      sortBy: 'Total',
      sortDesc: true,
      fields: [
        { key: 'No', stickyColumn: true, isRowHeader: true, sortable: false },
        { key: 'flag', stickyColumn: true, sortable: false },
        { key: 'Country', sortable: false },
        {
          key: 'Total',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'Today',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'Active',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'critical',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'recovered',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'Deaths',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'todays_Deaths',
          label: 'Today',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'Tested',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'per_One_Million',
          label: '/1Million',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        }
      ]
    }
  },
  computed: {
    lastUpdated () {
      return this.results.map((date) => {
        return date.updated
      })
    },
    items () {
      return this.results.map((stat, index) => {
        return { No: index + 1, flag: stat.countryInfo.flag, Country: stat.country, Total: stat.cases, Today: stat.todayCases, Active: stat.active, critical: stat.critical, recovered: stat.recovered, Deaths: stat.deaths, todays_Deaths: stat.todayDeaths, Tested: stat.tests, per_One_Million: stat.testsPerOneMillion }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  row-gap: 2rem;
}
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

.table-flag {
  width: 40px;
  height: 20px;
  border-radius: 1px;
  object-fit: cover;
}
</style>
