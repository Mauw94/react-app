import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const style = {
  fontWeight: 'italic',
  fontSize: '15px',
    paddingLeft: '40px'
};

const styleId = {
    fontWeight: 'italic',
    fontSize: '15px',
    paddingLeft: '60px'
};

const headerStyle = {
  fontWeight: 'bold',
  fontSize: '18px'
};

const Row = (props) => (
    <TableRow key={props.entry.id}>
        <TableRowColumn style={style}>{props.entry.naam}</TableRowColumn>
        <TableRowColumn style={styleId}>{props.entry.id}</TableRowColumn>
        <TableRowColumn><button className="btn btn-danger" onClick={() => { props.delete(props.entry.id) }}>Verwijderen</button></TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map(e => (
    <Row entry={e} delete={props.delete} />
));

const LocatiesTable = (props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Naam</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Id</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete?</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete} />
        </TableBody>
    </Table>
)


export default LocatiesTable;