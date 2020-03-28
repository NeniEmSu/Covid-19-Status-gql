# Covid-19 Status Using GraphQL Apollo and Relevant information about Covid-19

> This Nuxt SSR App with the help of Apollo consumes [rlindskog/covid19-graphql](https://github.com/rlindskog/covid19-graphql) that consumes the  [pomber/covid19](https://github.com/pomber/covid19) api to provide a SPA visualization of the data set across all countries and valuable information on getting through the covid-19 pandemic.

It also pulls real-time worldwide Data from [NovelCOVID/API](https://github.com/NovelCOVID/API)

This project is aimed to be informative for anyone using it and educative for anyone reading through the code.

## Challenges faced during project

1. Aggregating data from array of historical data to provide world wide values
2. Properly implementing the fetch API to make get requests and handle errors.
3. Adapting data to be use in chart.js
4. Improving Responsiveness

## Future addition

1. Complete the design according to design from [Pixency](https://dribbble.com/shots/10804689-Corona-Covid-19-landing-page)
2. Add animations using GSAP
3. Add Chart.js
4. Add map visualization.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
