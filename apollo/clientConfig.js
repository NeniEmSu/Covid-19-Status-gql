import {
  InMemoryCache
} from 'apollo-cache-inmemory'
export default function (context) {
  return {
    httpLinkOptions: {
      // uri: context.env.API_GQL_LINK,
      uri: 'https://covid19-graphql.now.sh/',
      credentials: 'same-origin'
    },
    cache: new InMemoryCache(),
    wsEndpoint: null
  }
}
