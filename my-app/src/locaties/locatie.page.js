import React, {Component} from 'react';
import {connect} from 'react-redux';
import LocatiesTable from './locatie.table';
import HttpService from '../common/http-service';
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
        this.props.deleteEntry(id);
        HttpService.deleteLocatieById(id);
    }

    render() {
        const fetchedEntries = this.props.locatieEntries;
        console.log(fetchedEntries);
        return (
            <div>
                <LocatiesTable entries={fetchedEntries} delete={this.delete}/>
                <Link to="/locaties/add">
                    <FloatingActionButton style={{position: 'fixed', right: '15px', bottom: '15px'}}>
                        <ContentAdd/>
                    </FloatingActionButton>
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
        locatieEntries: state.locatieEntries,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchToPropsTitle(dispatch, ownProps),
        setEntries: (entries) => {
            dispatch({type: 'SET_LOCATIE_ENTRIES', payload: entries});
        },
        deleteEntry: (id) => {
            dispatch({type: 'DELETE_LOCATIEENTRY', payload: id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatiePage)