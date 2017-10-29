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

            fetched = true;
        }
    }

    render() {
        const locatieEntry = this.props.locatieEntry;
        const probleemEntries = this.props.probleemEntries;

        fetched = false;
        return (
            <form>
                <div className={'form-group'} style={{textAlign: 'center'}}>
                    <h4>Probleem meldingen: {locatieEntry.naam}</h4>
                </div>
                <div style={{margin: '50px'}}>
                    <ProblemenTablePerLocatie entries={probleemEntries}/>
                </div>
                <div style={{marginLeft: '50px'}}>
                    <Link to={'/locaties'}>
                        <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>Back</button>
                    </Link>
                </div>
            </form>
        );
    }

    componentDidMount() {
        this.props.setTitle('Locatie details');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locatieEntry: state.locatieEntry,
        probleemEntries: state.probleemEntries,
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatiePageDetails)