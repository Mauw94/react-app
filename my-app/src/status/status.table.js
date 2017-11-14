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
        <TableRowColumn style={rowStyle}>{props.entry.id}</TableRowColumn>
        <TableRowColumn style={rowStyle}>{props.entry.status}</TableRowColumn>
        <TableRowColumn style={rowStyle}>{props.entry.locatieid}</TableRowColumn>
        <TableRowColumn>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={() => {
                props.delete(props.entry.id)
            }}>Delete
            </button>
        </TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map((e,i) => (
    <Row key={i} entry={e} delete={props.delete}/>
));

const StatussenTable = (props) => (
    <Table className=".table-striped .table-condensed">
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>ID</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Status</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>LocatieID</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete}/>
        </TableBody>
    </Table>
)

export default StatussenTable;