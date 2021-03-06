import axios from 'axios';

const baseUrl= 'http://localhost:4000';

function query(query) {
    return new Promise((resolve, reject) => {
        try {
            axiosQuery(query, resolve, reject);
            } catch (e) {
                console.log(e.message);
            }
            
        }
    )}


function axiosQuery(query, onResolve, onReject) {
    axios({
        method: 'post',
        url: `${baseUrl}/graphql`,
        data: {
            query:`
                ${query}
            `
        ,
        }
    })
    .then(result => {
        if(result.data.errors) {
            onReject(result.data.errors)
        }
        else {
            onResolve(result.data.data)
        }
        
    }).catch(error => {
        const response = 
            error.response !== undefined ? error.response.status : error;
        onReject(response);
    })
}

export default { query };