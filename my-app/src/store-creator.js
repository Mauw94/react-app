const initialState = {
    title: 'Dashboard',
    locationEntries: [],
    issueEntries: [],
    issueEntry: '',
    scoreEntry: '',
    locationEntry: '',
    statusEntries: [],
    statusEntry: '',
};

const storecreator = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {...state, ...{title: action.payload}};
        case 'SET_LOCATIE_ENTRIES':
            return {...state, ...{locationEntries: action.payload}};
        case 'SET_LOCATIE_ENTRY':
            return {...state, ...{locationEntry: action.payload}};
        case 'ADD_LOCATIEENTRY':
            return {...state, ...{locationEntries: [...state.locationEntries, action.payload]}};
        case 'UPDATE_LOCATIE_ENTRY':
            return {...state, ...{locationEntry: action.payload}};
        case 'DELETE_LOCATIEENTRY':
            const id = action.payload;
            const entryToDeleteIndex = state.locationEntries.findIndex(e => e.id === id);
            const locatieEntries = [...state.locationEntries.slice(0, entryToDeleteIndex), ...state.locationEntries.slice(entryToDeleteIndex + 1)];
            return {...state, ...{locationEntries: locatieEntries}};
        case 'SET_PROBLEEMMELDING_ENTRIES':
            return {...state, ...{issueEntries: action.payload}};
        case 'SET_PROBLEEMMELDING_ENTRY' :
            return {...state, ...{issueEntry: action.payload}};
        case 'SET_SCORE_ENTRY':
            return {...state, ...{scoreEntry: action.payload}};
        case 'ADD_PROBLEEMMELDING_ENTRY':
            return {...state, ...{issueEntries: [...state.issueEntries, action.payload]}};
        case 'DELETE_PROBLEEMMELDING_ENTRY':
            const probleemId = action.payload;
            const entryToDelete = state.issueEntries.findIndex(e => e.id === probleemId);
            const probleemEntries = [...state.issueEntries.slice(0, entryToDelete), ...state.issueEntries.slice(entryToDelete + 1)];
            return {...state, ...{issueEntries: probleemEntries}};
        case 'SET_STATUS_ENTRIES' :
            return {...state, ...{statusEntries: action.payload}};
        case 'SET_STATUSMELDING_ENTRY':
            return {...state, ...{statusEntry: action.payload}};
        case 'ADD_STATUS_ENTRY':
            return {...state, ...{statusEnties: [...state.statusEntries, action.payload]}};
        case 'DELETE_STATUS_ENTRY':
            const statusId = action.payload;
            const statusToDelete = state.statusEntries.findIndex(e => e.id === statusId);
            const statusEntries = [...state.statusEntries.slice(0, statusToDelete), ...state.statusEntries.slice(statusToDelete + 1)];
            return {...statusEntries, ...{statusEntries: statusEntries}};
        default:
            return state;
    }
}

export default storecreator;