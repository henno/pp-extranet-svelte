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
        {id: 1, text: `Company 1`},
        {id: 2, text: `Company 2`},
    ]

    $: console.log('Changed selected:', selectedCompany)
    $: console.log('Updated options:', companies)

    import { session } from '$app/stores';
    import { goto } from '$app/navigation';
    import {t} from "../translations/translations.js";
    const navigation = [
        {
            href: '/',
            name: 'Home',
        },
        {
            href: '/protected',
            name: `${$session.user ? '🔓' : '🔒'} Protected`,
        },
    ];
    async function handleSignOut() {
        await fetch('/api/sign-out');
        $session = {};
        await goto('/sign-in');
    }
</script>

<header>
    <Navbar color="dark" dark expand="md">
        <Nav navbar>
            <NavItem>
                <NavLink href="/">{$t('homePage')}</NavLink>
            </NavItem>
            {#if $session.user}
                <NavItem>
                    <NavLink on:click={handleSignOut}>{$t('signOut')}</NavLink>
                </NavItem>
            {/if}
            <Dropdown class="position-absolute end-0 me-2" nav setActiveFromChild>
                <DropdownToggle nav class="nav-link" caret>Dropdown</DropdownToggle>
                <DropdownMenu dark>
                    {#each navigation as link}
                        <DropdownItem href="{link.href}">{link.name}</DropdownItem>
                    {/each}
                </DropdownMenu>
            </Dropdown>
        </Nav>
    </Navbar>
</header>

<style>
</style>
