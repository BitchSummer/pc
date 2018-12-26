<template>
	<div>
		<div class="num-statistics">
			<div>
				<h1>{{form.monthCapacity}}</h1>
				<p>月度容量(GB)</p>
			</div>
			<div>
				<h1>{{form.usedCapacity}}</h1>
				<p>使用容量(GB)</p>
			</div>
			<div>
				<h1>{{form.monthCapacity-form.usedCapacity}}</h1>
				<p>剩余容量(GB)</p>
			</div>
		</div>
		<div class="num-statistics">
			<div>
				<h1>{{form.allotCapacity}}</h1>
				<p>已分配容量(GB)</p>
			</div>
			<div>
				<h1>{{form.price}}</h1>
				<p>单价</p>
			</div>
			<div>
				<h1>{{form.sumPrice}}</h1>
				<p>总价</p>
			</div>
			<div>
				<h1>{{form.monthCapacity-form.allotCapacity}}</h1>
				<p>剩余容量(GB)</p>
			</div>
			
		</div>
	</div>

</template>

<script>
	export default {
		props: ['form']
	}
</script>

<style lang="less">
	.num-statistics {
		display: flex;
		justify-content: center;
		height: 129px;
		align-items: center;

		div {
			flex: 1;
			text-align: center;
		}

		h1 {
			color: #0D6FF4;
			font-size: 20px;
		}

		p {
			color: #999999;
			font-size: 14px;
		}
	}
</style>
