<template>
  <toast :config="toastData" @doNext="doNext" @close="toastData.dialogVisible=false">
    <el-row class="authenticaSele">
      <el-col :span="22" :offset="1">
        <el-steps  :active="1" align-center >
          <el-step title="认证选择"></el-step>
          <el-step title="认证申请"></el-step>
          <el-step title="平台审核"></el-step>
					<el-step title="完成认证"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="24">
          <div class="as-select">
               <div class="as-select-item" :class="{'as-active':active==='个人'}" @click="active='个人'">
                   <img style="margin-right: 20px;" src="../../../assets/img/card.png" alt="">
                   <img class="horn" src="../../../assets/img/horn.png" alt="">
                   <div>
                       <h3>个人认证</h3>
                       <p>以个体户形式进行认证，认证后您可以在云市场自由交易</p>
                   </div>
               </div>  
                   <div class="as-select-item" :class="{'as-active':active==='企业'}" @click="active='企业'">
                     <img style="margin-right: 20px;" src="../../../assets/img/card.png" alt="">
                     <img class="horn" src="../../../assets/img/horn.png" alt="">
                   <div>
                       <h3>企业认证</h3>
                       <p>以企业形式进行认证，认证后您可以在云市场自由交易</p>
                   </div>
               </div>
          </div>
      </el-col>
    </el-row>

  </toast>
</template>
<script>
  export default {
    data() {
      return {
        toastData: { //办结弹窗数据
          title: "认证选择", //弹窗标题
          dialogVisible: false, //弹窗显示
          width: "800px", //弹窗宽
          btnData: [ {
            name: '下一步', //按钮名
            method: 'doNext', //回调函数
            bgColor: 'dialog-bule' //按钮背景
          }]
        },
        active:'企业'
      }
    },
    methods: {
      show(){
        this.toastData.dialogVisible = true;
      },
      doNext() {//点击下一步
				if(this.active=='个人')
					this.$emit('auth','个人');
				else
					this.$emit('auth','企业');
        this.toastData.dialogVisible = false;
      }
    }
  }

</script>
<style lang="less">
   .authenticaSele{
        .as-select{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .as-select-item{
                margin: 20px 0;
                height: 120px;
                display: flex;
                box-sizing: border-box;
                padding:25px;
                border: 1px solid #eee;
                position: relative;
                cursor: pointer;
                h3{
                    margin-bottom: 15px;
                    margin-top: 6px;
                }
            }
            .horn{
              display: none;
              margin-right: 0px;
              position: absolute;
              top: 0;
              right: 0;
            }
            .as-active{
                border-color: #409EFF;
                .horn{
                  display: block;
                }
            }
        }
   }
</style>
