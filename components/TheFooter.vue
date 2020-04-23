<template>
  <footer>
    <div class="footer-nav container">
      <hr>
      <h4>Learn more about <a target="_blank" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">COVID-19(WHO)</a></h4>
      <p>
        <i>
          All data and information provided on this site is for informational purposes only. I make no representation as to accuracy, completeness, currentness, suitability, or validity of any information on this site and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use. All information is provided on an as-is basis.
        </i>
      </p>
      <hr>
      <nuxt-link to="/">
        Home
      </nuxt-link>
      <nuxt-link to="/charts">
        Charts
      </nuxt-link>
      <nuxt-link to="/blog">
        Blog
      </nuxt-link>
      <nuxt-link to="/credits">
        Credits
      </nuxt-link>
    </div>
    <div class="container end">
      <p class="designer">
        Designed By <a
          href="https://dribbble.com/Mashok"
          target="_blank"
          rel="noopener noreferrer"
        >Pixency</a>
      </p>
      <p class="logo">
        COVID-<span>19</span>
      </p>
      <p class="coder">
        &copy; {{ new Date().getFullYear() }} —
        <a
          href="https://github.com/cryptodoct0r"
          target="_blank"
          rel="noopener noreferrer"
        >NeniEmSu</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
footer {
  height: auto;
  width: 100vw;

  margin-top: 40px;
  padding: 20px 0;

  background-color: rgba(36, 36, 36, 0.7);

  display: flex;
  justify-content: center;
  flex-direction: column;
}

.footer-nav{
  a{
    margin: 0 20px 0 0;
  }

  .nuxt-link-exact-active {
    border-bottom: 2px solid coral;
  }
}

.end {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 425px){
    flex-direction: column;
    text-align: center;
  }
}

p {
  margin: auto 0;
  &.designer,
  &.coder {
    font-family: AvenirNext-Medium;
    font-weight: normal;
    font-size: 20px;
    color: #fffefe;
    opacity: 0.6;
    a {
      color: #fece00;
      font-size: inherit;
    }
  }
  &.logo {
    font-family: "Gilroy-ExtraBold";
    font-weight: normal;
    font-size: 30px;
    margin: auto 10px;

    span {
      color: #fece00;
      font-size: inherit;
    }
  }
}
</style>
