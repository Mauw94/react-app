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

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        const locatieid = this.props.match.params.locatieid;

        if (!fetched) {
            HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
            HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
            HttpService.getScoreByIdProbleemmelding(id).then(fetchedScore => this.props.setScore(fetchedScore));
            this.checkAfgehandeld();

            fetched = true;

        }
    }

    checkAfgehandeld() {
        if (this.props.probleemEntry.afgehandeld === 1) {
            this.afgehandeld = 'Ja';
        } else {
            this.afgehandeld = 'Nee'
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (this.score){
            this.props.scoreEntry.totaleScore += this.state.value;
            this.props.scoreEntry.aantalScores +=1;
            HttpService.updateScoreById(parseInt(this.props.scoreEntry.id),parseInt(this.props.match.params.id), 1, parseInt(this.state.value)).then(() => {
                alert(this.props.match.params.id+' old ' + this.state.value);
            });


        }else {
            HttpService.postScore(parseInt(this.props.match.params.id), 1, parseInt(this.state.value)).then(() => {
                alert(this.props.match.params.id+' new ' + this.state.value);
            });

        }

        event.preventDefault();
    }

    render() {
        const probleemEntry = this.props.probleemEntry;
        console.log('probleem' + probleemEntry);
        const locatieEntry = this.props.locatieEntry;
        fetched = false;

        this.score = parseInt(this.props.scoreEntry.totaleScore) / parseInt(this.props.scoreEntry.aantalScores);

        return (
            <div>
                <form>
                    <div className={'form-group'}
                         style={{textAlign: 'left', marginTop: '150px', marginLeft: '120px', padding: '15px'}}>
                        <p style={style}><b>Probleem:</b> {probleemEntry.probleem}</p>
                        <p style={style}><b>Locatie: </b> {locatieEntry.naam}</p>
                        <p style={style}><b>Datum: </b> {probleemEntry.datum}</p>
                        <p style={style}><b>Afgehandeld: </b> {probleemEntry.afgehandeld}</p>
                        <p style={style}><b>Score: </b> {this.score}</p>
                        <p>
                        </p>
                        <Link to={'/problemen'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>
                                Back
                            </button>
                        </Link>
                    </div>
                </form>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Score:
                        <input type="number" min="1" max="5" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Beoordeel" />
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


