<template>
    <div>
        <el-col :span="7">
            <el-select v-model="ccode" placeholder="请选择城市" @change="ChangeCity">
                <el-option v-for="item in cityOptions" :key="item.Code" :label="item.CityName" :value="item.Code">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="7" m v-show="isShowArea">
            <el-select v-model="acode" placeholder="请选择区域" @change="ChangeArea">
                <el-option v-for="item in areaOptions" :key="item.Code" :label="item.AreaName" :value="item.Code">
                </el-option>
            </el-select>
        </el-col>
    </div>
</template>

<script>
import { getAllCity, getAreaListByCity } from '@/api/dic'
export default {
  props: {
    cityCode: { default: '' },
    isShowArea: { default: false },
    areaCode: { default: '' }
  },
  data() {
    return {
      cityOptions: [],
      ccode: '',
      areaOptions: [],
      acode: ''
    }
  },
  methods: {
    ChangeCity() {
      this.$emit('SelectCity', this.ccode)
      this.acode = ''
      if (this.isShowArea) {
        this.getAreaListByCity()
      }
    },
    ChangeArea() {
      this.$emit('SelectArea', this.acode)
    },
    GetAllCity() {
      // 获取所有城市
      getAllCity().then(response => {
        this.cityOptions = response.data
      })
    },
    getAreaListByCity() {
      // 获取区域
      if (this.ccode == '') {
        return
      }
      getAreaListByCity(this.ccode).then(response => {
        this.areaOptions = response.data
      })
    }
  },
  created() {
    this.ccode = this.cityCode
    this.acode = this.areaCode
    this.GetAllCity()
    this.getAreaListByCity()
  },
  watch: {
    cityCode(val) {
      this.ccode = val
      this.acode = ''
    },
    areaCode(val) {
      this.acode = val
    }
  }
}
</script>