<script context="module">
    export const prerender = true;
    import Select from 'svelte-select';
    import { t } from '$lib/translations/translations';

    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte'
    import { et } from 'date-fns/locale'
    let date = new Date()
    let locale = localeFromDateFnsLocale(et)

</script>

<script lang="ts">
    import {
        Button,
        ButtonGroup, Col,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader, Row
    } from 'sveltestrap';

    let open = false;
    let size = '';
    const toggle = () => {
        size = undefined;
        open = !open;
    };
    const toggleXl = () => {
        size = 'xl';
        open = !open;
    };

    import {Form, FormGroup, FormText, Input, Label} from 'sveltestrap';
    import {Table} from 'sveltestrap';

    let columns = [{
        label: "Work form",
        name: "work form",
    }, {
        label: "Work group",
        name: "work group",
    }, {
        label: "Work type",
        name: "work type",
    }, {
        label: "Volume of space/work",
        name: "volume of space/work",
    }, {
        label: "Price",
        name: "price",
    }];

    let rows = [];

    function addRow(e) {
        rows.push({});
        rows = rows;
    }

    function removeRow(i) {
        const part = rows.splice(i, 1);
        rows = rows;
    }

    let selectedLocation = $t('selectLocation');
    let optionsLocation = [
        {id: 1, text: `SEB Tartu harukontor`},
        {id: 2, text: `SEB Tallinna harukontor`},
        {id: 3, text: `SEB Paide harukontor`}
    ]

    let selectedPriority;
    let priorityOptions = [
        {id: 1, text: $t('priorityHigh')},
        {id: 2, text: $t('priorityMedium')},
        {id: 3, text: $t('priorityLow')},
    ];

    let items = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
        {value: 'chips', label: 'Chips'},
        {value: 'ice-cream', label: 'Ice Cream'},
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
        {value: 'chips', label: 'Chips'},
        {value: 'ice-cream', label: 'Ice Cream'},
    ];
</script>


<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>

<section>
    <Col xs="12">
        <ButtonGroup>
            <Button color="success" on:click={toggleXl}>{$t('newOrder')}</Button>
        </ButtonGroup>

        <Modal isOpen={open} {toggle} {size}>
            <ModalHeader {toggle}>{$t('newOrder')}</ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="locationSelect">{$t('location')}</Label>
                                <Input class="test" type="select" name="select" id="locationSelect" bind:value={selectedLocation}>
                                    {#each optionsLocation as value}
                                        <option {value}>{value.text}</option>
                                    {/each}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleDate">{$t('dateDue')}</Label>
                                    <DateInput bind:value={date} format={'dd.MM.yyyy'} closeOnSelection {locale} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="prioritySelect">{$t('priority')}</Label>
                                <Input type="select" name="select" id="prioritySelect" bind:value={selectedPriority}>
                                    {#each priorityOptions as value}
                                        <option {value}>{value.text}</option>
                                    {/each}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="orderDescription">{$t('orderDescription')}</Label>
                                <Input type="textarea" name="text" id="orderDescription"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">{$t('addFile')}</Label>
                                <Input type="file" name="file" id="exampleFile"/>
                                <FormText color="muted">
                                    {$t('addFileDescription')}
                                </FormText>
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <a class="float-end my-3" href on:click|preventDefault={addRow}>
                                <Button color="success">{$t('addWork')}</Button>
                            </a>
                        </Col>
                        <Col xs="12">
                            <Table striped>
                                <thead>
                                <tr>
                                    {#each columns as column (column.name)}
                                        <th>{column.label}</th>
                                    {/each}
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {#each rows as row, i (i)}
                                    <tr class:odd={i%2}>
                                        <td>
                                            <Select placeholder="Choose" id="exampleSearch" {items}/>
                                        </td>
                                        <td>
                                            <Select placeholder="Choose" id="exampleSearch" {items}/>
                                        </td>
                                        <td>
                                            <Select placeholder="Choose" id="exampleSearch" {items}/>
                                        </td>
                                        <td>
                                            <Select placeholder="Choose" id="exampleSearch" {items}/>
                                        </td>
                                        <td>
                                            <Select placeholder="Choose" id="exampleSearch" {items}/>
                                        </td>
                                        <td>
                                            <a href on:click|preventDefault={e => removeRow(i)}>
                                                <button type="button" class="btn btn-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                        <path fill-rule="evenodd"
                                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                                    </svg>
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                {/each}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" on:click={toggle}>Do Something</Button>
                <Button color="secondary" on:click={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </Col>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
</style>
