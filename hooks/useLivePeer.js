import axios from 'axios';

const LivePeer = () => {
    const httpClient = axios.create({
        baseURL: 'https://livepeer.studio',
    });

    httpClient.interceptors.request.use(
        (req) => {
                req.headers['Authorization'] = `Bearer fcd783b5-749d-41f5-b0ed-149949e3de6c`
            
            return req
        }
    );

    const headers = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer fcd783b5-749d-41f5-b0ed-149949e3de6c`
        }
    }




    const getAllSessions = async () => {
        try {
            const allStreams = [];
            const response = await httpClient.get('/api/stream');
            // const response = await axios.get('https://livepeer.studio/api/stream', headers);

            console.log("session aajao", response.data);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }


    return { getAllSessions };

}

export default LivePeer;