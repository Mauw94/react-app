import axios from 'axios';

class HttpService {
    baseUrl = 'http://192.168.33.11';

    getLocaties() {
        return axios.get(`${this.baseUrl}/locaties/`).then(l => {
            return l.data
        });
    }

    getLocatieById(id) {
        return axios.get(`${this.baseUrl}/locaties/${id}`).then(l => {
            return l.data
        });
    }

    addLocatie(naam) {
        return axios.post(`${this.baseUrl}/locaties/`, {naam: naam});
    }

    deleteLocatieById(id) {
        return axios.delete(`${this.baseUrl}/locaties/${id}`);
    }

    getProbleemMeldingingen() {
        return axios.get(`${this.baseUrl}/problemen/`).then(p => {
            return p.data
        });
    }

    getProbleemMeldingById(id) {
        return axios.get(`${this.baseUrl}/problemen/${id}`).then(p => {
            return p.data
        });
    }

    getProbleemMeldingByLocatieId(locatieId) {
        return axios.get(`${this.baseUrl}/problemen/perlocatie/${locatieId}`).then(p => {
            return p.data
        });
    }

    addProbleemMelding(locatieid, probleem, datum, afgehandeld) {
        return axios.post(`${this.baseUrl}/problemen/`, {
            locatieid: locatieid,
            probleem: probleem,
            datum: datum,
            afgehandeld: afgehandeld
        });
    }

    deleteProbleemMelding(id) {
        return axios.delete(`${this.baseUrl}/problemen/${id}`);
    }

    getStatusMeldingen() {
        return axios.get(`${this.baseUrl}/statussen/`).then(s => {
            return s.data
        });
    }

    addStatusMelding(locatieid, status, datum) {
        return axios.post(`${this.baseUrl}/statussen/`, {
            locatieid: locatieid,
            status: status,
            datum: datum
        });
    }

    deleteStatusmelding(id) {
        return axios.delete(`${this.baseUrl}/statussen/${id}`);
    }

    getScoreByIdProbleemmelding(id){
        return axios.get(`${this.baseUrl}/scoreprobleem/${id}`).then(p => {
            return p.data
        });
    }
}

const httpService = new HttpService();

export default httpService;
