<template>
    <div class="no-admission">
                 <p>您尚未实名认证,请先进行实名认证...</p>
                  <el-button type="primary"  @click="authentica">去认证</el-button>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    methods:{
        ...mapMutations(['ADD_TAG']),
        authentica(){
            // this.$router.push({ name: 'realNameAut' })
            this.ADD_TAG({
                id:11,
                title:'实名认证',
                link:'/realNameAut'
            });
        }
    }
}
</script>
<style lang="less">
  .no-admission{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      flex-direction: column;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      p{
          color: #666;
          font-size: 20px;
          margin-bottom: 27px;
      }
			
  }
</style>
