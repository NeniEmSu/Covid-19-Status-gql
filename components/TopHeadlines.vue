<template>
  <section class="topHeadlines">
    <div class="container">
      <h2>Latest News</h2>
      <div class="headlinesContent">
        <h4 v-if="$fetchState.pending">
          Fetching posts...
        </h4>
        <h4 v-else-if="$fetchState.error">
          Error while fetching posts: {{ $fetchState.error.message }}
        </h4>
        <div
          v-for="post in posts.articles"
          :key="post.title"
          class="blog-card"
        >
          <img
            :src="post.urlToImage"
            alt="6"
          >
          <small>Date: {{ $moment(post.publishedAt).format('LLLL') }}</small>
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <a
            :href="post.url"
            target="_blank"
            rel="noopener noreferrer"
          >Read More</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch () {
    const location = await fetch('https://freegeoip.app/json/')
    const userLocation = await location.json()
    const availableCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
    const apiKey = `https://newsapi.org/v2/top-headlines?country=${availableCountryCodes.includes(userLocation.country_code.toLowerCase()) ? userLocation.country_code.toLowerCase() || 'us' : 'us'}&q=covid&pageSize=4&apiKey=511ae156b57c455cbb56c949021bdb79`
    const topHeadlines = await fetch(apiKey)
    const postJson = await topHeadlines.json()
    this.posts = postJson
  },

  fetchOnServer: false,

  data () {
    return {
      posts: []
    }
  }
}
</script>

<style lang="scss" scoped>
.topHeadlines {
  width: 100vw;
  height: auto;
  padding: 5rem 0;
}

h2 {
  font-weight: normal;
  font-size: 3.75rem;
  text-align: left;
  color: #fffefe;

  margin-bottom: 5.25rem;
}

.headlinesContent {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 20px;

  @media screen and (max-width: 766px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

small {
  font-family: "AvenirNext-DemiBold";
  font-weight: normal;
  font-size: 14px;
  text-align: left;
  color: #fffefe;
}

.blog-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  height: auto;
  // margin: auto;
}
img {
  width: 100%;
  height: 380px;
  border-radius: 10px;
  object-fit: cover;
  margin: 0 0 24px 0;

  @media screen and (max-width: 766px) {
    height: 240px;
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
}
</style>
