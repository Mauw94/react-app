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
    fontWeight: 'bold',
    fontSize: '16px'
};

const rowStyleMargin = {
    fontWeight: 'bold',
    fontSize: '16px',
    paddingLeft: '50px'
};

const headerStyle = {
    fontWeight: 'bold',
    fontSize: '15px'
};

const Row = (props) => (
    <TableRow key={props.entry.id}>
        <TableRowColumn style={rowStyle}>{props.entry.probleem}</TableRowColumn>
        <TableRowColumn style={rowStyleMargin}>{props.entry.afgehandeld}</TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map((e,i) => (
    <Row key={i} entry={e}/>
))

const ProblemenTablePerLocatie = (props) => (
    <Table className=".table-striped .table-condensed">
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Probleem</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Afgehandeld?</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries}/>
        </TableBody>
    </Table>
)

export default ProblemenTablePerLocatie;