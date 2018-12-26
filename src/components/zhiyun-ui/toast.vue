      /* toastData:{
          title:'啦啦啦',//弹窗标题
          dialogVisible:true,//弹窗显示
          width:'600px',//弹窗宽
          btnData:[{
            name:'确定',//按钮名
            method:'dialogSuer',//回调函数
            bgColor:'dialog-bule'//按钮背景
          },{
            name:'确定并继续',
            method:'savaAgain',
            bgColor:'dialog-deep-blue'
          }]
      }*/
<template>
    <el-dialog class="poc-toast" :title="config.title" :visible.sync="config.dialogVisible" :close-on-click-modal="false" :append-to-body="config.appendToBody" :width="config.width" @close="callBack('handleClose')" @open="callBack('showWin')">
        <!-- 内容   主题内容自定义部分-->
        <slot></slot>
        <!-- 按钮组 -->
        <div class="btn-group" v-if="config.btnData&&config.btnData.length>0">
            <el-button v-for="item in config.btnData" :disabled="item.disabled==true" :class="item.bgColor" @click="callBack(item.method)">{{item.name}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  props: ["config"],
  methods: {
    callBack(method) {
      this.$emit(method);
    }
  }
};
</script>
<style lang="less">
   .dialog-bule,.dialog-white,.dialog-deep-blue{
      width: 120px;
      height:  36px;
      box-sizing: border-box;
      font-size: 14px;
      outline: none;
      border: none;
      border-radius: 2px;
      cursor: pointer;
   }
   .dialog-white{
      background-color: white;
      color: #5C6466;
      border: 1px solid #CCCDD0;
   }
   .dialog-bule{
     background-color: #267AFC;
     color: #FFFFFF;
     margin-left: 36px;
   }
   .dialog-deep-blue{
      background-color: white;
      color: #267AFC;
      border: 1px solid #267AFC;
      margin-left: 36px;
   }
   .btn-group{
       float: left;
       position: relative;
       left: 50%;
       transform: translate(-50%,0);
   }
   .el-dialog__body{
     overflow: hidden;
     padding: 20px;
   }
   .el-dialog__header{
     border-bottom:  1px solid #EFEFEF;
   }
   .el-dialog__title{
    font-size: 16px;
    color: #2D3132;
   }
</style>

