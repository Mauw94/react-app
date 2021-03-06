import React, {Component} from 'react';
import {connect} from 'react-redux';
import LocatiesTable from './location.table';
import HttpService from '../common/http-service';
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

let hasFetchedLocatiesEntries = false;

class LocatiePage extends Component {
    componentWillMount() {
        if (!hasFetchedLocatiesEntries) {
            HttpService.getLocaties().then(fetchedEntries => this.props.setEntries(fetchedEntries));
            hasFetchedLocatiesEntries = true;
        }
    }

    delete = (id) => {
        if (window.confirm('Are you sure?')) {
            this.props.deleteEntry(id);
            HttpService.deleteLocatieById(id);
        } else {
            return;
        }
    }

    render() {
        const fetchedEntries = this.props.locationEntries;
        return (
            <div>
                <LocatiesTable entries={fetchedEntries} delete={this.delete}/>
                <Link to="/locaties/add">
                    <button
                        className={'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect'}
                        style={{position: 'fixed', right: '15px', bottom: '15px'}}>
                        <i className={'material-icons'}>add</i>
                    </button>
                </Link>
            </div>
        );
    }

    componentDidMount() {
        this.props.setTitle('Locaties');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locationEntries: state.locationEntries,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchToPropsTitle(dispatch, ownProps),
        setEntries: (locaties) => {
            dispatch({type: 'SET_LOCATIE_ENTRIES', payload: locaties});
        },
        deleteEntry: (id) => {
            dispatch({type: 'DELETE_LOCATIEENTRY', payload: id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatiePage)