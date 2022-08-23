<script lang="ts">
	import {Cell} from '@smui/layout-grid'
</script>
<Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
	<div class="grid-button">
		<slot></slot>
	</div>
</Cell>
<style>
	.grid-button {
		padding: 5px;
		border-radius: 8px;
		background-color: #ff980060;
	}
</style>