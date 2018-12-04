<template>
<el-row :span="24">
    <el-form :inline="true" v-for="(item,index) in formData" label-width="40px">

        <template v-for="(item2,key2) in item">

            <el-form-item :label="item2.Label">
                <el-input v-model="Entity[index][key2]" v-if="item2.Type=='input'" v-on:input="input"></el-input>
                <el-upload v-if="item2.Type=='img'" :on-progress="handleProgress" :show-file-list="false" :on-success="handleSuccess" action="http://192.168.10.10:4210/api/activity/upload_img" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="9" :on-exceed="handleExceed">
                    <el-button size="small" icon='el-icon-picture-outline' type="success" @click="up(index,key2)">{{Entity[index].UpText}}</el-button>

                </el-upload>
            </el-form-item>

        </template>
        <el-form-item>
            <el-button type="danger" icon="el-icon-delete" @click="del(index)" v-if="index!=0">删除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="add()" v-if="index==0">添加</el-button>
        </el-form-item>
    </el-form>

</el-row>
</template>

<script>
export default {
    props: ["formTemplate", "formText"]

        ,
    data() {
        return {
            FileIndex: 0,
            FileFiled: "",
            UpText: "上传图片",
            Entity: [],
            formData: []

        }
    },
    methods: {
        input(tag) {
            console.info(tag)
            this.$emit('input', this.Entity)
        },
        handleProgress() {
            this.Entity[this.FileIndex].UpText = "正在上传"
        },
        handleSuccess(res, file) {
            this.Entity[this.FileIndex].UpText = "上传成功"
            console.info(res)
            console.info(file)
            this.Entity[this.FileIndex][this.FileFiled] = res.Data
            console.info(this.Entity)
            this.$emit('input', this.Entity)

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        del(index) {
            this.FormData.splice(index, 1)
            this.Entity.splice(index, 1)
            this.$emit('input', this.Entity)
        },
        add() {

            this.FormData.push(this.FormTemplate)
            var data = {};
            for (var key in this.FormTemplate) {
                data[key] = ""
            }
            data.UpText = "上传图片"
            this.Entity.push(data)
            this.$emit('input', this.Entity)
        },
        up(index, filed) {
            console.info(index)
            this.FileIndex = index
            this.FileFiled = filed

        }
    },
    mounted() {

    },
    created() {

        this.formData = [];
        console.info(this.formText)
        console.info(this.formTemplate)
        if (this.formText.length > 0) {

            this.formText.forEach(item => {
               
                var t = JSON.parse(JSON.stringify(this.formTemplate))
                for (var key in this.formTemplate) {
                    t[key].Value = item[key]
                }
                console.info(t)
                this.formData.push(t)
            })
        } else {
            this.formData.push(this.formTemplate)
            console.info(this.formTemplate);
            var data = {};
            for (var key in this.FormTemplate) {
                data[key] = ""
            }
            data.UpText = "上传图片"
            this.Entity.push(data)
            this.FileIndex = 0;
            this.UpText = "上传图片"
            console.info(this.Entity)
        }
        console.info("1111111111111")
        console.info(this.formData)
    },
}
</script>
