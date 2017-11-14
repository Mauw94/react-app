import React from 'react';
import {connect} from 'react-redux';
import HttpService from '../common/http-service';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import StatussenTable from './status.table';

let hasFetchedEntries = false;

class StatusmeldingPage extends React.Component {
    componentWillMount() {
        if (!hasFetchedEntries) {
            HttpService.getStatusMeldingen().then(fetchedEntries => this.props.setEntries(fetchedEntries));
            hasFetchedEntries = true;
        }
    }

    delete = (id) => {
        if (window.confirm('Are you sure?')) {
            this.props.deleteEntry(id);
            HttpService.deleteStatusmelding(id);
        } else {
            return;
        }
    }

    render() {
        const statussen = this.props.statusEntries;
        return (
            <div>
                <StatussenTable entries={statussen} delete={this.delete}/>
            </div>
        );
    }

    componentDidMount() {
        this.props.setTitle('Status Meldingen');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusEntries: state.statusEntries
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setEntries: (entries) => {
            dispatch({type: 'SET_STATUS_ENTRIES', payload: entries});
        },
        deleteEntry: (id) => {
            dispatch({type: 'DELETE_STATUS_ENTRY', payload: id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusmeldingPage)