<script lang="js">
	import {
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Nav,
		NavItem,
		NavLink,
		Navbar,
		Dropdown
	} from 'sveltestrap';

	let selectedCompany = 'Company 1';
	let companies = [
		{ id: 1, text: `Company 1` },
		{ id: 2, text: `Company 2` },
	]

	$: console.log('Changed selected:', selectedCompany)
	$: console.log('Updated options:', companies)
</script>

<header>
	<Navbar color="dark" dark expand="md">
		<Nav navbar>
			<NavItem>
				<NavLink href="/components/">Inactive Link</NavLink>
			</NavItem>
			<Dropdown class="position-absolute end-0 me-2" nav setActiveFromChild>
				<DropdownToggle nav class="nav-link" caret>Dropdown</DropdownToggle>
				<DropdownMenu dark>
					{#each companies as company}<DropdownItem href="#">{company.text}</DropdownItem>{/each}
				</DropdownMenu>
			</Dropdown>
		</Nav>
	</Navbar>
</header>

<style>
</style>
