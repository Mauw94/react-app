const initialState = {
    title: 'Dashboard',
    locatieEntries: [],
    probleemEntries: [],
    probleemEntry: '',
    scoreEntry: '',
    locatieEntry: '',
    statusEntries: [],
    statusEntry: '',
};

const storecreator = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {...state, ...{title: action.payload}};
        case 'SET_LOCATIE_ENTRIES':
            return {...state, ...{locatieEntries: action.payload}};
        case 'SET_LOCATIE_ENTRY':
            return {...state, ...{locatieEntry: action.payload}};
        case 'ADD_LOCATIEENTRY':
            return {...state, ...{locatieEntries: [...state.locatieEntries, action.payload]}};
        case 'DELETE_LOCATIEENTRY':
            const id = action.payload;
            const entryToDeleteIndex = state.locatieEntries.findIndex(e => e.id === id);
            const locatieEntries = [...state.locatieEntries.slice(0, entryToDeleteIndex), ...state.locatieEntries.slice(entryToDeleteIndex + 1)];
            return {...state, ...{locatieEntries: locatieEntries}};
        case 'SET_PROBLEEMMELDING_ENTRIES':
            return {...state, ...{probleemEntries: action.payload}};
        case 'SET_PROBLEEMMELDING_ENTRY' :
            return {...state, ...{probleemEntry: action.payload}};
        case 'SET_SCORE_ENTRY':
            return {...state, ...{scoreEntry: action.payload}};
        case 'ADD_PROBLEEMMELDING_ENTRY':
            return {...state, ...{probleemEntries: [...state.probleemEntries, action.payload]}};
        case 'DELETE_PROBLEEMMELDING_ENTRY':
            const probleemId = action.payload;
            const entryToDelete = state.probleemEntries.findIndex(e => e.id === probleemId);
            const probleemEntries = [...state.probleemEntries.slice(0, entryToDelete), ...state.probleemEntries.slice(entryToDelete + 1)];
            return {...state, ...{probleemEntries: probleemEntries}};
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