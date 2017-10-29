import React from 'react';
import {connect} from 'react-redux';
import ProbleemmeldingTable from './probleemmelding.table';
import HttpService from '../common/http-service';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

let fetched = false;

class ProbleemmeldingPage extends React.Component {
    componentWillMount() {
        if (!fetched) {
            HttpService.getProbleemMeldingingen().then(fetchedEntries => this.props.setEntries(fetchedEntries));
            fetched = true;
        }
    }

    delete = (id) => {
        this.props.deleteEntry(id);
        HttpService.deleteProbleemMelding(id);
    }

    render() {
        const fetchedEntries = this.props.probleemEntries;
        return (
            <div>
                <ProbleemmeldingTable entries={fetchedEntries} delete={this.delete}/>
                <Link to="/problemen/add">
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
        this.props.setTitle('Probleem Meldingen');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        probleemEntries: state.probleemEntries,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setEntries: (entries) => {
            dispatch({type: 'SET_PROBLEEMMELDING_ENTRIES', payload: entries});
        },
        deleteEntry: (id) => {
            dispatch({type: 'DELETE_PROBLEEMMELDING_ENTRY', payload: id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemmeldingPage)