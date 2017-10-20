import axios from 'axios';

class HttpService {
    baseUrl = 'http://192.168.33.11';

    getLocaties(){
        return axios.get(`${this.baseUrl}/locaties/`).then(l => {return l.data});
    }

    getLocatieById(id){
        return axios.get(`${this.baseUrl}/locaties/${id}`).then(l => {return l.data});
    }

    addLocatie(naam){
        return axios.post(`${this.baseUrl}/locaties/`, {naam: naam});
    }

    deleteLocatieById(id){
        return axios.delete(`${this.baseUrl}/locaties/${id}`);
    }
}

const httpService = new HttpService();

export default httpService;
