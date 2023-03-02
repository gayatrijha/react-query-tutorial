import axios from 'axios';


const client = axios.create({baseURL: 'http://localhost:4000'})


//export function tht wraps all axios request , accepts all the function tht axios accepts
export const request =({...options}) =>{ 
    //bearer token present in the header
    client.defaults.headers.common.Authorization =`Bearer token`    
    const onSuccess = response =>response
    const onError =  error =>{
        //optionally catch error and add additional login here || rediresct to login page if status code is 401
    }

    return client(options).then(onSuccess).catch(onError)
}