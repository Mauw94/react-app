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
import Description from 'material-ui/svg-icons/action/description';

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
        <TableRowColumn style={style}><Link to={'/locaties/details/' + props.entry.id}>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                <Build/>
            </button>
        </Link></TableRowColumn>
        <TableRowColumn style={style}>
            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--accent'} onClick={() => {
                props.delete(props.entry.id)
            }}>
                <Delete/>
            </button>
        </TableRowColumn>
        <TableRowColumn style={style}>
            <Link to={'/locaties/update/' + props.entry.id}>
                <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>
                    <Description/>
                </button>
            </Link>
        </TableRowColumn>
    </TableRow>
)

const Rows = (props) => props.entries.map((e, i) => (
    <Row key={i} entry={e} delete={props.delete}/>
));

const LocatiesTable = (props) => (
    <Table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <TableHeader className={'mdl-data-table__cell--non-numeric'}>
            <TableRow>
                <TableHeaderColumn style={headerStyle}>Naam</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Id</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Status</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Delete</TableHeaderColumn>
                <TableHeaderColumn style={headerStyle}>Update</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <Rows entries={props.entries} delete={props.delete}/>
        </TableBody>
    </Table>
)


export default LocatiesTable;