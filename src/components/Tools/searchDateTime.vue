<template>
  <el-form-item label="时间">
     <el-date-picker v-model="addDate" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="changeDate">
    </el-date-picker>
  </el-form-item>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      addDate: ''
    }
  },
  methods: {
    changeDate() {
      this.$emit('showDate', this.addDate)
    }
  }
}
</script>