<script context="module">
    export const prerender = true;
    import {t} from '$lib/translations/translations';
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

    const toggleLg = () => {
        size = 'lg';
        open = !open;
    };

    import {Form, FormGroup, Input} from 'sveltestrap';
    import {Table} from 'sveltestrap';

    let columns = [{
        label: "Job name",
        name: "job name",
    }];

    let jobs = [
        {id: 1, text: `Job name 1`},
        {id: 2, text: `Job name 2`},
        {id: 3, text: `Job name 3`}
    ]

    let rows = [];

    function addRow(e) {
        rows.push({});
        rows = rows;
    }

    function removeRow(i) {
        const part = rows.splice(i, 1);
        rows = rows;
    }

    async function getJobs() {
        const test = await post(`/auth/jobs`)
        console.log(await test);
    }
</script>

<section>
    <Col xs="12">
        <ButtonGroup>
            <Button color="success" on:click={toggleLg}>{$t('addJob')}</Button>
        </ButtonGroup>

        <Modal isOpen={open} {toggle} {size}>
            <ModalHeader {toggle}>{$t('addJob')}</ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
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
                                            <FormGroup>
                                                <Input type="text" name="text" id="jobName"/>
                                            </FormGroup>
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
                        <Col xs="12">
                            <a class="float-end my-3" href on:click|preventDefault={addRow}>
                                <Button color="success">{$t('addWork')}</Button>
                            </a>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" on:click={toggle}>Add</Button>
                <Button color="secondary" on:click={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </Col>
    <Col xs="12">
        <Table striped>
            <thead>
            <tr>
                <th>List of jobs</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {#each jobs as job, i (i)}
                <tr class:odd={i%2}>
                    <td>
                        <FormGroup>
                            {job.text}
                        </FormGroup>
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
