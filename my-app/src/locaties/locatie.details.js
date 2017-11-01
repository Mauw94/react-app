import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';
import ProblemenTablePerLocatie from "../probleemmeldingen/probleemmelding.table.perlocatie";

let fetched = false;

class LocatiePageDetails extends React.Component {

    componentWillMount() {
        const id = this.props.match.params.id;
        if (!fetched) {
            HttpService.getLocatieById(id).then(fetchedEntry => this.props.setLocatie(fetchedEntry));
            HttpService.getProbleemMeldingByLocatieId(id).then(fetchedProbleemMeldingen => this.props.setProbleemMeldingen(fetchedProbleemMeldingen));
            HttpService.getStatusByLocatie(id).then(fetchedStatus => this.props.setStatusMelding(fetchedStatus));
            fetched = true;
        }
    }

    render() {
        const locatieEntry = this.props.locatieEntry;
        const probleemEntries = this.props.probleemEntries;
        const statusEntry = this.props.statusEntry;

        fetched = false;
        return (
            <form>
                <div className={'form-group'} style={{textAlign: 'center'}}>
                    <h4>Probleem meldingen: {locatieEntry.naam}</h4>
                </div>
                <div style={{margin: '50px'}}>
                    <ProblemenTablePerLocatie entries={probleemEntries}/>
                </div>
                <div style={{margin: '50px'}}>
                    <b>Status:</b> {statusEntry.status}
                </div>
                <div style={{margin: '50px'}}>
                    (if there's no status, please add one.)
                </div>
                <div style={{marginLeft: '50px'}}>
                    <Link to={'/locaties'}>
                        <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>Back
                        </button>
                    </Link>
                    <Link to={'/locaties/status/' + locatieEntry.id + '/' + statusEntry.id} style={{margin: '10px'}}>
                        <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>
                            Edit status
                        </button>
                    </Link>
                    <Link to={'/locaties/addstatus'} style={{margin: '10px'}}>
                        <button className={'mdl-button mdl-js-button mdl-button--raised'}>Add status</button>
                    </Link>
                </div>
            </form>
        );
    }

    componentDidMount
    () {
        this.props.setTitle('Locatie details');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locatieEntry: state.locatieEntry,
        probleemEntries: state.probleemEntries,
        statusEntry: state.statusEntry,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setLocatie: (locatie) => {
            dispatch({type: 'SET_LOCATIE_ENTRY', payload: locatie});
        },
        setProbleemMeldingen: (probleemMeldingen) => {
            dispatch({type: 'SET_PROBLEEMMELDING_ENTRIES', payload: probleemMeldingen});
        },
        setStatusMelding: (statusMeldingen) => {
            dispatch({type: 'SET_STATUSMELDING_ENTRY', payload: statusMeldingen});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatiePageDetails)