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
import Build from 'material-ui/svg-icons/action/build';
import Delete from 'material-ui/svg-icons/action/delete';

const rowStyle = {
    fontSize: '12px',
};

const rowStyleMargin = {
    paddingLeft: '50px',
};

const headerStyle = {
    fontWeight: 'bold',
    fontSize: '13px'
};

const Row = (props) => (
    <TableRow key={props.entry.id}>
        <TableRowColumn style={rowStyle}>{props.entry.probleem}</TableRowColumn>
        <TableRowColumn style={rowStyleMargin}>{props.entry.afgehandeld}</TableRowColumn>
        <TableRowColumn style={rowStyle}>{props.entry.updownvote}</TableRowColumn>
        <TableRowColumn><Link to={'/problemen/details/' + props.entry.id + '/' + props.entry.locatieid}>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                <Build/></button></Link>
        </TableRowColumn>
        <TableRowColumn>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={() => {
                props.delete(props.entry.id)
            }}><Delete/></button>
        </TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map((e, i) => (
    <Row key={i} entry={e} delete={props.delete}/>
));

const ProblemenTable = (props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Probleem</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Status</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Priority</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Details</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete}/>
        </TableBody>
    </Table>
)

export default ProblemenTable;