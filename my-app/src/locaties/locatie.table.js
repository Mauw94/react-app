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
        <TableRowColumn style={{fontWeight: 'italic', fontSize: '15px'}}>{props.entry.naam}</TableRowColumn>
        <TableRowColumn><button className="btn btn-danger" onClick={() => { props.delete(props.entry.id) }}>Verwijderen met id: {props.entry.id}</button></TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map(e => (
    <Row entry={e} delete={props.delete} />
));

const LocatiesTable = (props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={{fontweight: 'bold', fontSize: '24px'}}>Naam</TableHeaderColumn>
                <TableHeaderColumn style={{fontweight: 'bold', fontSize: '24px'}}>Id</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete} />
        </TableBody>
    </Table>
)


export default LocatiesTable;