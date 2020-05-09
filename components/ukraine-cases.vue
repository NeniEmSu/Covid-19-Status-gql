<template>
  <div class="container mt-5">
    <h2>Cases in Ukriane</h2>
    <p>Last updated {{ $moment(Date.now()).format('LLLL') }}</p>
    <b-table
      striped
      hover
      dark
      responsive
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items="items"
    />
  </div>
</template>

<script>
export default {
  async fetch () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch(`https://api-covid19.rnbo.gov.ua/data?to=${this.$moment(Date.now()).format('YYYY-MM-DD')}`, requestOptions)
    const data = await response.json()
    this.ukraineCases = data.ukraine
  },
  fetchOnServer: false,

  data () {
    return {
      ukraineCases: [],
      sortBy: 'Total',
      sortDesc: true,
      fields: [
        { key: 'State_en', stickyColumn: true, isRowHeader: true, sortable: false },
        { key: 'State_uk', sortable: false },
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
          key: 'recovered',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'Rec_Today',
          label: 'Today',
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
          key: 'Deaths_Today',
          label: 'Today',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        },
        {
          key: 'Suspected_cases',
          label: 'Suspected',
          sortable: true,
          formatter: (value) => {
            return value.toLocaleString()
          }
        }
      ]
    }
  },
  computed: {
    items () {
      return this.ukraineCases.map((stat, index) => {
        return { State_en: stat.label.en, State_uk: stat.label.uk, Total: stat.confirmed, Today: stat.delta_confirmed, Active: stat.existing, recovered: stat.recovered, Rec_Today: stat.delta_recovered, Deaths: stat.deaths, Deaths_Today: stat.delta_deaths, Suspected_cases: stat.suspicion }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
