import axios from 'axios';

class HttpService {
    baseUrl = '192.168.33.11';

    getLocaties(){
        return axios.get(`${this.baseUrl}/locaties/`).then(l => l.data);
    }

    getLocatieById(id){
        return axios.get(`${this.baseUrl}/locaties/${id}`).then(l => l.data);
    }

    addLocatie(id, naam){
        return axios.post(`${this.baseUrl}/locaties/`, {id: id, naam: naam});
    }

    deleteLocatieById(id){
        return axios.delete(`${this.baseUrl}/locaties/${id}`);
    }
}

const httpService = new HttpService();

export default httpService;
