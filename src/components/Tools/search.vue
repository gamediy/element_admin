<template>
<keep-alive>
<el-row>
    <el-col :span="22">

        <template v-for="(item,index) in Where.List">
            <el-select v-model="Where.List[index].WhereCol" @change="Change" placeholder="请选择字段" clearable style="width: 120px" class="filter-item">
                <el-option v-for="sl in item.WhereColArr" :key="sl.Value" :label="sl.Label" :value="sl.Value+':'+index" select> </el-option>
            </el-select>
            <el-select v-model="Where.List[index].WhereCon" placeholder="请选择条件" clearable style="width: 150px;margin-left:9px" class="filter-item">
                <el-option label="等于" value="0"></el-option>
                <el-option label="包含" value="1"></el-option>
                <el-option label="开始于" value="2"></el-option>
                <el-option label="结束于" value="3"></el-option>
                <el-option label="不包含" value="4"></el-option>
                <el-option label="大于" value="5"></el-option>
                <el-option label="大于等于" value="6"></el-option>
                <el-option label="小于" value="7"></el-option>
                <el-option label="小于等于" value="8"></el-option>
                <el-option label="介于" value="9"></el-option>
            </el-select>

            <el-input v-if="Where.List[index].Type=='int'" type='number' v-model="Where.List[index].WhereVal" style="width: 200px;" class="filter-item " clearable></el-input>

            <el-input v-if="Where.List[index].WhereCon==9&&Where.List[index].Type=='int'" type='number' v-model="Where.List[index].WhereVal1" style="width: 200px;" class="filter-item" clearable></el-input>

            <el-input v-if="Where.List[index].Type=='string'" v-model="Where.List[index].WhereVal" style="width: 200px;" class="filter-item " clearable></el-input>

            <el-input v-if="Where.List[index].WhereCon==9&&Where.List[index].Type=='string'" v-model="Where.List[index].WhereVal1" style="width: 200px;" class="filter-item" clearable></el-input>

            <el-date-picker v-if="Where.List[index].Type=='DateTime'" format="yyyy-MM-dd HH:mm:ss" class="filter-item " v-model="Where.List[index].WhereVal" type="datetime" placeholder="" align="right">
            </el-date-picker>
            <el-date-picker v-if="Where.List[index].WhereCon==9&&Where.List[index].Type=='DateTime'" format="yyyy-MM-dd HH:mm:ss" class="filter-item " v-model="Where.List[index].WhereVal1" type="datetime" placeholder="" align="right">
            </el-date-picker>

            <el-select v-if="Where.List[index].Type=='drop'" filterable  v-model="Where.List[index].WhereVal" placeholder="请选择" class="filter-item ">
                <el-option v-for="d in Where.List[index].Drop" :key="d.Value" :label="d.Label" :value="d.Value">
                </el-option>
            </el-select>
            <el-select v-if="Where.List[index].WhereCon==9&&Where.List[index].Type=='drop'" filterable  v-model="Where.List[index].WhereVal1" placeholder="请选择" class="filter-item ">
                <el-option v-for="d in Where.List[index].Drop" :key="d.Value" :label="d.Label" :value="item.Value">
                </el-option>
            </el-select>
        </template>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" v-on:click="Submit()">查询</el-button>
        <el-button class="filter-item" type="warning" @click="AddSearch" icon='el-icon-plus'>添加查询条件</el-button>

        <el-button class="search-btn filter-item" ref="searchBtn" type="danger" id="search" @click="DelSearch" v-if="SearchData&&Where.List.length>SearchData.length" icon='el-icon-delete'>删除查询条件</el-button>
         <el-button class="search-btn filter-item" ref="searchBtn" type="danger" id="search" @click="DelSearch"  v-else-if="!SearchData&&Where.List.length>1" icon='el-icon-delete'>删除查询条件</el-button>
    </el-col>

</el-row>
</keep-alive>

</template>

<script>
import waves from "../../utils/directive/waves/index.js"; // 水波纹指令
export default {
    directives: {
        waves
    },
    props: {
        WhereColArr: {
            type: Array
        },
        SearchData: {
            type: Array,
            defautl: []

        }

    },
    data: function () {
        return {

            InputType: 1,
            Drop: [],
            Where: {
                List: [],
                WhereCol: "", //筛选字段
                WhereCon: "0", //筛选条件
                WhereVal: "", //值
                WhereVal1: "" //值1
            },
            WhereArr: [{
                WhereCol: "", //筛选字段
                WhereCon: "0", //筛选条件
                WhereVal: "", //值
                WhereVal1: "" //值1
            }]
        };
    },
    methods: {
        Add() {

        },
        Submit() {

            var WhereList = []
            var newObj = JSON.parse(JSON.stringify(this.Where.List))
            console.info(newObj)
            if (this.SearchData && this.SearchData.length > 0) {
                for (var i = 0; i < this.SearchData.length; i++) {
                    newObj[i].WhereCol = this.SearchData[i].Value
                }
            }
            newObj.forEach(item => {
                delete item.Drop;
                delete item.WhereColArr;
                delete item.InputType;
                item.WhereCol = item.WhereCol.split(':')[0]
                WhereList.push(item);
            })
            this.$emit("Submit", WhereList)
        },
        Change(data) {

            var field = data.split(":")[0]
            var index = data.split(":")[1]
            var item = this.Where.List[index]
            item.WhereVal = ""
            item.WhereVal1 = ""
            //item.WhereCol=field;
            console.info(this.Where.List);
            item.WhereColArr.forEach(element => {
                if (element.Value == field) {

                    item.Type = element.Type
                    if (element.Drop) {
                        item.Drop = element.Drop
                    }

                }
            });
            console.info(this.Where.List);

        },
        AddSearch() {
            this.Where.List.push({
                WhereColArr: this.WhereColArr,
                WhereCol: "", //筛选字段
                WhereCon: "0", //筛选条件
                WhereVal: "", //值
                WhereVal1: "", //值1
                Type: "string"
            })
        },
        DelSearch() {

            this.Where.List.splice(this.Where.List.length - 1, 1)

        }
    },
    created() {
        if (this.SearchData && this.SearchData.length > 0) {
            var list = []
            this.SearchData.forEach(item => {
                var d = {
                    WhereColArr: [{
                        Value: item.Value,
                        Label: item.Label,
                        Type: item.Type,
                    }],
                    Drop: item.Drop,
                    WhereCol: item.Label, //筛选字段
                    WhereCon: item.WhereCon, //筛选条件
                    WhereVal: "", //值
                    WhereVal1: "", //值1
                    Type: item.Type
                }
                list.push(d)
            })

            this.Where.List = JSON.parse(JSON.stringify(list))
        } else {
            this.Where.List.push({
                WhereColArr: this.WhereColArr,
                WhereCol: "", //筛选字段
                WhereCon: "0", //筛选条件
                WhereVal: "", //值
                WhereVal1: "", //值1
                Type: "string"
            })
        }

    },
};
</script>
