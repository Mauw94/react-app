import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const rowStyle = {
    fontWeight: 'italic',
    fontSize: '12px',
    paddingLeft: '10px'
};

const headerStyle = {
    fontWeight: 'bold',
    fontSize: '15px'
};

const Row = (props) => (
    <TableRow key={props.entry.id}>
        <TableRowColumn style={rowStyle}>{props.entry.status}</TableRowColumn>
        <TableRowColumn style={rowStyle}>{props.entry.datum}</TableRowColumn>
        <TableRowColumn style={rowStyle}>{props.entry.locatieid}</TableRowColumn>
        <TableRowColumn>
            <button className="btn btn-danger" onClick={() => {
                props.delete(props.entry.id)
            }}>Delete?
            </button>
        </TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map(e => (
    <Row entry={e} delete={props.delete}/>
));

const StatussenTable = (props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Status</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Datum</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Locatie id</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete}/>
        </TableBody>
    </Table>
)


export default StatussenTable;