import axios from 'axios'

const SET_REPORT = 'SET_REPORT'
const SET_DATES = 'SET_DATES'
const SET_SEARCH = 'SET_SEARCH'

export const state = () => ({
  report: [],
  dates: [],
  search: ''
})

export const mutations = {
  [SET_REPORT] (state, report) {
    state.report = report
  },
  [SET_DATES] (state, dates) {
    state.dates = dates
  },
  [SET_SEARCH] (state, search) {
    state.search = search
  }
}

export const actions = {
  fetchReport ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://pomber.github.io/covid19/timeseries.json')
        .then(({ data }) => {
          commit(SET_REPORT, Object.entries(data))
          // commit(SET_DATES, getDates(data));

          resolve('Success')
        })
        .catch((error) => {
          console.log('Error', error)
          reject(error)
        })
    })
  },
  search ({ commit }, search) {
    commit(SET_SEARCH, search)
  }
}

export const getters = {
  dates: (state) => {
    return state.dates
  },
  report: (state) => {
    return state.report.filter(record => record[0].toLowerCase().includes(state.search.toLowerCase()))
  },
  reportForCountry: state => (country) => {
    return state.report.filter(record => record[0].toLowerCase().includes(country.toLowerCase()))
  },
  reportTotals: (state) => {
    return getWorldTotals(state.report)
  }
}

// Get all dates from the first country
// Not the best solution but good enough
// Obsolete !
// function getDates (report) {
//   const firstProp = Object.keys(report)[0]

//   return firstProp
//     ? report[firstProp].map((item) => {
//       return item.date
//     })
//     : []
// }

function getWorldTotals (report) {
  let confirmed = 0
  let recovered = 0
  let deaths = 0

  report.forEach((item) => {
    const current = item[1][item[1].length - 1]
    confirmed += current.confirmed
    recovered += current.recovered
    deaths += current.deaths
  })

  return {
    confirmed,
    recovered,
    deaths
  }
}
