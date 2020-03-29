<template>
  <div>
    <div class="container">
      <h1>Blog Posts</h1>
    </div>
    <section class="blog-updates">
      <div class="container">
        <h2>Top Headings From {{ location }}</h2>
        <div>
          <transition name="fade" mode="out-in" :duration="{ enter: 500, leave: 500 }">
            <h4 v-if="$fetchState.pending">
              Fetching posts...
            </h4>
            <h4 v-else-if="$fetchState.error">
              Error while fetching posts: {{ $fetchState.error.message }}
            </h4>
            <div v-else class="headlinesContent">
              <h4 v-if="usPosts.totalResults < 1">
                Unfortunately there are no posts from {{ location }} at the moment
              </h4>
              <div
                v-for="post in usPosts.articles"
                v-else
                :key="post.title"
                class="blog-card"
              >
                <div class="image-container">
                  <img
                    :src="post.urlToImage"
                    :alt="post.title"
                    @error="setFallbackImageUrl"
                  >
                  <a
                    :href="`https://${post.source.name}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>Source: {{ post.source.name }}</p></a>
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
    <section class="blog-updates">
      <div class="container">
        <h2>Top Headings From {{ location2 }}</h2>
        <div>
          <transition name="fade" mode="out-in" :duration="{ enter: 500, leave: 500 }">
            <h4 v-if="$fetchState.pending">
              Fetching posts...
            </h4>
            <h4 v-else-if="$fetchState.error">
              Error while fetching posts: {{ $fetchState.error.message }}
            </h4>
            <div v-else class="headlinesContent">
              <h4 v-if="ngPosts.totalResults < 1">
                Unfortunately there are no posts from {{ location }} at the moment
              </h4>
              <div
                v-for="post in ngPosts.articles"
                v-else
                :key="post.title"
                class="blog-card"
              >
                <div class="image-container">
                  <img
                    :src="post.urlToImage"
                    :alt="post.title"
                    @error="setFallbackImageUrl"
                  >
                  <a
                    :href="`https://${post.source.name}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>Source: {{ post.source.name }}</p></a>
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
  </div>
</template>

<script>
export default {
  components: {
  },

  async fetch () {
    const ngApiKey = `https://newsapi.org/v2/top-headlines?country=${'ng'}&q=covid&pageSize=6&apiKey=511ae156b57c455cbb56c949021bdb79`
    const usApiKey = `https://newsapi.org/v2/top-headlines?country=${'us'}&q=covid&pageSize=6&apiKey=511ae156b57c455cbb56c949021bdb79`
    const usTopHeadlines = await fetch(usApiKey)
    const postJson = await usTopHeadlines.json()
    this.usPosts = postJson
    const ngTopHeadlines = await fetch(ngApiKey)
    const ngpostJson = await ngTopHeadlines.json()
    this.ngPosts = ngpostJson
  },

  fetchOnServer: false,

  data () {
    return {
      usPosts: [],
      ngPosts: [],
      location: 'USA',
      location2: 'Nigeria'
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
.blog-updates {
  width: 100vw;
  height: auto;
  padding: 2.5rem 0;
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
    border-radius: 10px;
    object-fit: cover;

    @media screen and (max-width: 766px) {
      height: 240px;
    }
  }

  p {
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
