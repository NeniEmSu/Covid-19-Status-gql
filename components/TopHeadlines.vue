<template>
  <section class="topHeadlines">
    <div class="container">
      <h2>Latest News From {{ location }}</h2>
      <div>
        <transition name="fade" mode="out-in" :duration="{ enter: 500, leave: 500 }">
          <h4 v-if="$fetchState.pending">
            Fetching posts...
          </h4>
          <h4 v-else-if="$fetchState.error">
            Error while fetching posts: {{ $fetchState.error.message }}
          </h4>
          <div v-else class="headlinesContent">
            <h4 v-if="posts.totalResults < 1">
              Unfortunately there are no posts from {{ location }} at the moment
            </h4>
            <div
              v-for="post in posts.articles"
              v-else
              :key="post.title"
              class="blog-card"
            >
              <div class="image-container">
                <img
                  v-if="post.urlToImage === null"
                  :src="fallbackImageUrl"
                  :alt="post.title"
                >
                <img
                  v-else
                  :src="post.urlToImage"
                  :alt="post.title"
                  @error="setFallbackImageUrl"
                >
                <span
                  class="source"
                >
                  Source: {{ post.source.name }}
                </span>
              </div>

              <small>Date: {{ $moment(post.publishedAt).format('LLLL') }}</small>
              <a
                :href="post.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{{ post.title }}</h3>
              </a>
              <p>{{ post.description }}</p>
              <a
                class="more"
                :href="post.url"
                target="_blank"
                rel="noopener noreferrer"
              >Read More</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch () {
    const location = await fetch('https://freegeoip.app/json/')
    const userLocation = await location.json()
    console.log(userLocation)
    const availableCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
    const apiKey = `https://newsapi.org/v2/top-headlines?country=${availableCountryCodes.includes(userLocation.country_code.toLowerCase()) ? userLocation.country_code.toLowerCase() || 'ng' : 'ng'}&q=covid&pageSize=4&apiKey=511ae156b57c455cbb56c949021bdb79`
    // const apiKey = `https://newsapi.org/v2/top-headlines?country=${'ua'}&q=covid&pageSize=6&apiKey=511ae156b57c455cbb56c949021bdb79`
    const topHeadlines = await fetch(apiKey)
    const postJson = await topHeadlines.json()
    this.location = userLocation.country_name || 'Nigeria'
    this.posts = postJson
  },

  fetchOnServer: false,

  data () {
    return {
      posts: [],
      location: 'Nigeria'
    }
  },

  computed: {
    fallbackImageUrl () {
      return require(`~/assets/img/${'covidFallback' + Math.floor(Math.random() * (2 - 1) + 1) + '.jpg'}`)
    }
  },

  methods: {
    setFallbackImageUrl (event) {
      event.target.src = require(`~/assets/img/${'covidFallback' + Math.floor(Math.random() * (2 - 1) + 1) + '.jpg'}`)
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
  margin-bottom: 5px;
}

.blog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  max-width: 560px;
  width: 100%;
  height: auto;

  @media screen and (max-width: 766px) {
    margin-bottom: 20px;
  }
}

.image-container {
  position: relative;
  margin: 0 0 24px 0;
  img {
    width: 100%;
    height: 380px;
    min-height: auto;
    border-radius: 10px;
    object-fit: cover;

    @media screen and (max-width: 766px) {
      height: 240px;
    }
  }

  span.source {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    bottom: 2.5%;
    right: 5%;
    padding: 2.5px 5px;
    border-radius: 5px;
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
  margin-bottom: 24px;
}

a.more {
  position: absolute;
  bottom: 0px;
}
</style>
