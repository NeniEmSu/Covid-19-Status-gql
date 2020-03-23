<template>
  <header>
    <div class="header-inner container">
      <img src="~/assets/img/virus.svg">

      <p>COVID-19</p>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
header{
  height: 100px;
  width: 100vw;

}

.header-inner{
display: flex;
  justify-content: center;
  text-align: flex-start;

  margin: auto;
  height: 100px;
}

.header-inner img{
  height: 50px;
  margin: auto 0;
}

.header-inner p{
  margin: auto 10px;
}
</style>
