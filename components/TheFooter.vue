<template>
  <footer>
    <div class="container end">
      <p class="designer">
        Design By <span>Pixency</span>
      </p>
      <p class="logo">
        COVID-<span>19</span>
      </p>
      <p class="coder">
        &copy;   {{ new Date().getFullYear() }} —
        <span>NeniEmSu</span>
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
}

p {
  margin: auto 0;
  &.designer,&.coder {
    font-family: AvenirNext-Medium;
    font-weight: normal;
    font-size: 20px;
    text-align: left;
    color: #fffefe;
    opacity: 0.6;
    span {
      color: #fece00;
    }
  }
  &.logo {
    font-family: "Gilroy-ExtraBold";
    font-weight: normal;
    font-size: 30px;
    margin: auto 10px;

    span {
      color: #fece00;
    }
  }
}
</style>
