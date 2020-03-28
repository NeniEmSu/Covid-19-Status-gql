<template>
  <footer>
    <div class="container end">
      <p class="designer">
        Designed By <span> <a
          href="https://dribbble.com/Mashok"
          target="_blank"
          rel="noopener noreferrer"
        >Pixency</a> </span>
      </p>
      <p class="logo">
        COVID-<span>19</span>
      </p>
      <p class="coder">
        &copy; {{ new Date().getFullYear() }} —
        <span> <a
          href="https://github.com/cryptodoct0r"
          target="_blank"
          rel="noopener noreferrer"
        >NeniEmSu</a></span>
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
  height: 118px;
  width: 100vw;

  display: flex;
  justify-content: center;
  flex-direction: column;
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
    span {
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
