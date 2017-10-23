import React from 'react';
import {connect} from 'react-redux';
import ProbleemmeldingTable from './probleemmelding.table';
import HttpService from '../common/http-service';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

let hasFetchedEntries = false;

class ProbleemmeldingPage extends React.Component {
    componentWillMount() {
        if (!hasFetchedEntries) {
            HttpService.getProbleemMeldingingen().then(fetchedEntries => this.props.setEntries(fetchedEntries));
            hasFetchedEntries = true;
        }
    }
    delete = (id) => {
        this.props.deleteEntry(id);
        HttpService.deleteProbleemMelding(id);
    }

    render() {
        const fetchedEntries = this.props.probleemEntries;
        console.log(fetchedEntries);
        return (
            <div>
                <ProbleemmeldingTable entries={fetchedEntries} delete={this.delete}/>
                <Link to="/problemen/add">
                    <FloatingActionButton disabled={true} style={{position: 'fixed', right: '15px', bottom: '15px'}}>
                        <ContentAdd/>
                    </FloatingActionButton>
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
            dispatch({type: 'SET_PROBLEEMMELDING_ENTRIES', payload:entries});
        },
        deleteEntry: (id) => {
            dispatch({type: 'DELETE_PROBLEEMMELDING_ENTRY', payload:id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemmeldingPage)
