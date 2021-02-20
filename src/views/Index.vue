<template>
  <div class="home">
    123
  </div>
</template>

<script>
import api from '@/api';
export default {
    name: 'Index',
    mounted() {
        api.cwUserFund.updateFundNAV();
        api.cwFund.updateFund();
    }
};
</script>
