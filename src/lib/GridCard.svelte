<script lang="ts">
	import {Cell} from '@smui/layout-grid'
</script>
<Cell class="border mdc-elevation--z5" spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
	<div>
		<slot></slot>
	</div>
</Cell>

