<template>
  <div>
    <SituationReport />
    <EmergencyLine />
  </div>
</template>

<script>
import singleCountry from '~/gql/country'
import SituationReport from '~/components/SituationReport'
import EmergencyLine from '~/components/EmergencyLine'

export default {
  components: {
    EmergencyLine,
    SituationReport
  },
  apollo: {
    singleCountry: {
      prefetch: true,
      query: singleCountry
    }
  }
}
</script>

<style>

</style>
