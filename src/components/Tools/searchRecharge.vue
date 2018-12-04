<template>
<el-form-item label="充值列表">
  <el-select clearable placeholder="请选择" @change='changeRecharge' v-model="tradeSub">
    <el-option v-for="item in rechargeList" :key="item.value" :label="item.label" :value="item.value" ></el-option>
  </el-select>
  <el-alert :title="item.explan" type="info"> </el-alert>
</el-form-item>
</template>
<script>
import {
  getSearchRechargeList
} from '@/api/dic'
export default {
  data() {
    return {
      rechargeList: [],
      rechargeId: ''
    }
  },
  methods: {
    getRechargeList() {
      getSearchRechargeList().then(response => {
        if (response.data.IsSuccess) {
          this.rechargeList = response.data.Data
        }
      })
    },
    changeRecharge() {
      this.$emit('showRechargeVal', this.rechargeId)
    }
  },
  created() {
    this.getRechargeList()
  },
  watch: {

  }
}
</script>