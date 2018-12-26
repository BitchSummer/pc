<template>
    <div style="width: 100%;">
			<el-steps :active="0" simple style="width: 60%; margin: 40px;margin-left: 140px;">
				<el-step :title="step" v-for="(step) in config.steps"></el-step>
			</el-steps>
			<div class="go-msg">
				<p>{{config.title}}</p>
				<el-button type="primary"  @click="callback">{{config.btnText}}</el-button>
			</div>
                 
    </div>
</template>
<script>
export default {
	props: ['config'],
    methods:{
        callback(){
          this.$emit("callback")
        }
    }
}
</script>
<style lang="less">
  .go-msg{
     text-align: center;
      p{
          color: #666;
          font-size: 16px;
          margin-bottom: 27px;
      }
			
  }
</style>
