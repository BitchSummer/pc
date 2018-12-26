<template>
	<div>
		<div class="num-statistics">
			<div>
				<h1>{{form.sumPurchaseCount}}</h1>
				<p>累计申购(条)</p>
			</div>
			<div>
				<h1>{{form.sumUsedCount}}</h1>
				<p>累计发送(条)</p>
			</div>
			<div>
				<h1>{{form.lastMonthBalance}}</h1>
				<p>上月结余(条)</p>
			</div>
		</div>
		<div class="num-statistics">
			<div>
				<h1>{{form.monthPurchase}}</h1>
				<p>本月申购(条)</p>
			</div>
			<div>
				<h1>{{form.monthUsed}}</h1>
				<p>本月发送(条)</p>
			</div>
			<div>
				<h1>{{form.balanceCount}}</h1>
				<p>本月结余(条)</p>
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
