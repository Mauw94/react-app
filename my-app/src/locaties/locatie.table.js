import React from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const Row = (props) => (
    <TableRow key={props.entry.id}>
        <TableRowColumn>{props.entry.name}</TableRowColumn>
        <TableRowColumn><button onClick={() => {props.delete(props.entry.id)}}>Delete</button></TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map(e => (
    <Row entry={e} delete={props.delete}/>
));

const LocatiesTable = (props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn>Naam</TableHeaderColumn>
                <TableHeaderColumn>Id</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete}/>
        </TableBody>
    </Table>
)

export default LocatiesTable;