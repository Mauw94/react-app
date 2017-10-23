import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router-dom';

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
        <TableRowColumn style={rowStyle}>{props.entry.probleem}</TableRowColumn>
        <TableRowColumn style={rowStyle}>{props.entry.datum}</TableRowColumn>
        <TableRowColumn>
            <button className="btn btn-danger" onClick={() => {
                props.delete(props.entry.id)
            }}>Delete?
            </button>
        </TableRowColumn>
        <TableRowColumn><Link to={'/problemen/details/' + props.entry.id + '/' + props.entry.locatieid}>
            <button className="btn btn-info">Details</button>
        </Link></TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map(e => (
    <Row entry={e} delete={props.delete}/>
));

const ProblemenTable = (props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Probleem</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Datum</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Details</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete}/>
        </TableBody>
    </Table>
)


export default ProblemenTable;