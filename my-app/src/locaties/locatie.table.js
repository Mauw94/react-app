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

const style = {
  fontWeight: 'italic',
  fontSize: '15px',
    paddingLeft: '10px'
};

const styleId = {
    fontWeight: 'italic',
    fontSize: '15px',
    paddingLeft: '20px'
};

const headerStyle = {
  fontWeight: 'bold',
  fontSize: '18px'
};

const Row = (props) => (
    <TableRow key={props.entry.id}>
        <TableRowColumn style={style}>{props.entry.naam}</TableRowColumn>
        <TableRowColumn style={styleId}>{props.entry.id}</TableRowColumn>
        <TableRowColumn style={style}><Link to={'/locaties/details/' + props.entry.id}><button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Meldingen
        </button></Link></TableRowColumn>
        <TableRowColumn style={style}>
            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--accent'} onClick={() => {
                props.delete(props.entry.id)
            }}>Delete?</button>
        </TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map(e => (
    <Row entry={e} delete={props.delete} />
));

const LocatiesTable = (props) => (
    <Table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <TableHeader className={'mdl-data-table__cell--non-numeric'}>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Naam</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Id</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Status</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete} />
        </TableBody>
    </Table>
)


export default LocatiesTable;