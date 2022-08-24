<script lang="ts">
	import {Cell} from '@smui/layout-grid'
</script>
<Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
	<div class="border">
		<slot></slot>
	</div>
</Cell>