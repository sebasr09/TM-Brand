import { Auth } from 'aws-amplify';

export const getApi = async(route, responseType) => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        let result = await fetch(
            `${
        process.env.CT_ENV === 'production' ? process.env.REACT_APP_HOST_PROD : process.env.CT_ENV === 'pardo' ? process.env.REACT_APP_HOST_PARDO : process.env.REACT_APP_HOST_DEV
      }${route}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = responseType === 'BLOB' ? await result.blob() : await result.json();
        return result;
    } catch (err) {
        console.log(err);
        throw new Error(`Ha ocurrido un error. Intenta de nuevo más tarde. Error: ${err}`);
    }
};

export const postApi = async(route, body, responseType, noAuth) => {
    try {
        let result = await parametrizedFetch(route, body, 'POST', noAuth);
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = responseType === 'BLOB' ? await result.blob() : await result.json();
        return result;
    } catch (err) {
        console.log(body, err);
        throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
    }
};

export const binancePostApi = async(route, body, responseType, noAuth) => {
    try {
        let result = await parametrizedFetch(route, body, 'POST', noAuth);
        if (result.status !== 200){
            const errorJson = await result.json();
            console.log(errorJson)
            if(errorJson.message)throw new Error(`No estás autorizado para realizar esta acción.`);
            throw new Error(`Error code: ${errorJson.code}. Message: ${errorJson.msg}`);
        } 
        result = responseType === 'BLOB' ? await result.blob() : await result.json();
        return result;
    } catch (err) {
        console.log(body, err);
        throw new Error(err.message);
    }
};

export const putApi = async(route, body, noAuth) => {
    try {
        let result = await parametrizedFetch(route, body, 'PUT', noAuth);
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = await result.json();
        return result;
    } catch (err) {
        throw new Error(`Ha ocurrido un error. Intenta de nuevo más tarde. Error: ${err}`);
    }
};

export const deleteApi = async(route) => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        let result = await fetch(
            `${
        process.env.CT_ENV === 'production' ? process.env.REACT_APP_HOST_PROD : process.env.CT_ENV === 'pardo' ? process.env.REACT_APP_HOST_PARDO : process.env.REACT_APP_HOST_DEV
      }/${route}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
        );
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        await result.json();
        return result;
    } catch (err) {
        throw new Error(`Ha ocurrido un error. Intenta de nuevo más tarde. Error: ${err}`);
    }
};

const parametrizedFetch = async(route, body, method, noAuth) => {
    const headers = { 'Content-Type': 'application/json' };
    if (!noAuth) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(
        `${
      process.env.CT_ENV === 'production' ? process.env.REACT_APP_HOST_PROD : process.env.CT_ENV === 'pardo' ? process.env.REACT_APP_HOST_PARDO : process.env.REACT_APP_HOST_DEV
    }${route}`, {
            method,
            headers,
            body: JSON.stringify(body)
        }
    );
};

export const sendContactMessageApi = async(route, body, responseType, noAuth) => {
    try {
        let result = await fetch(
            `${
        process.env.CT_ENV === 'production' ? process.env.REACT_APP_HOST_PROD : process.env.CT_ENV === 'pardo' ? process.env.REACT_APP_HOST_PARDO : process.env.REACT_APP_HOST_DEV
      }${route}`, {
                method: 'POST',
                body: JSON.stringify(body)
            }
        );
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = responseType === 'BLOB' ? await result.blob() : await result.json();
        return result;
    } catch (err) {
        console.log(err);
        throw new Error(`Ha ocurrido un error. Intenta de nuevo más tarde. Error: ${err}`);
    }
};