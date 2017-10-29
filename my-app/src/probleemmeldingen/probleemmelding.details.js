import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

const style = {
    margin: '10px'
};

let fetched = false;

class ProbleemmeldingDetailsPage extends React.Component {

    componentWillMount() {
        const id = this.props.match.params.id;
        const locatieid = this.props.match.params.locatieid;
        console.log(locatieid);

        if (!fetched) {
            HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
            HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
            fetched = true;
            HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
            HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
            HttpService.getScoreByIdProbleemmelding(id).then(fetchedScore => this.props.setScore(fetchedScore));
            this.checkAfgehandeld();
        }
    }

    checkAfgehandeld() {
        if (this.props.probleemEntry.afgehandeld === 1) {
            this.afgehandeld = 'Ja';
        } else {
            this.afgehandeld = 'Nee'
        }
    }


    render() {
        const fetchedEntry = this.props.probleemEntry;
        const locatieEntry = this.props.locatieEntry;
        const scoreEntry = this.props.scoreEntry;

        this.score  = parseInt(this.props.scoreEntry.totaleScore)/parseInt(this.props.scoreEntry.aantalScores);
        return (
            <div>
                <form>
                    <div className={'form-group'}
                         style={{textAlign: 'left', marginTop: '150px', marginLeft: '120px', padding: '15px'}}>
                        <p style={style}><b>Probleem:</b> {fetchedEntry.probleem}</p>
                        <p style={style}><b>Locatie: </b> {locatieEntry.naam}</p>
                        <p style={style}><b>Datum: </b> {fetchedEntry.datum}</p>
                        <p style={style}><b>Afgehandeld: </b> {fetchedEntry.afgehandeld}</p>
                        <p style={style}><b>Score: </b> {this.score}</p>
                        <Link to={'/problemen'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>
                                Back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }

    componentDidMount() {
        this.props.setTitle('Details');
    }
}

const
    mapStateToProps = (state, ownProps) => {
        return {
            probleemEntry: state.probleemEntry,
            locatieEntry: state.locatieEntry,
            scoreEntry: state.scoreEntry,
        };
    };

const
    mapDispatchToProps = (dispatch, ownProps) => {
        return {
            ...mapDispatchTitleToProps(dispatch, ownProps),
            setEntry: (entry) => {
                dispatch({type: 'SET_PROBLEEMMELDING_ENTRY', payload: entry});
            },
            setLocatie: (locatie) => {
                dispatch({type: 'SET_LOCATIE_ENTRY', payload: locatie});
            },
            setScore: (score) => {
                dispatch({type: 'SET_SCORE_ENTRY', payload: score});
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemmeldingDetailsPage)


