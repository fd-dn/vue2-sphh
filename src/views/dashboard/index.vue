<template>
  <div class="dashboard-container">
    <car></car>
    <sale></sale>
    <Observe></Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import car from './car';
import sale from "@/views/dashboard/sale";
import Observe from "@/views/dashboard/Observe/Observe";
export default {
  name: 'Dashboard',
  components:{
    car,
    sale,
    Observe
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
