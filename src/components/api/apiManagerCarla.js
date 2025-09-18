import { Auth } from 'aws-amplify';

export const getCarlaApi = async(route, responseType, apiKey) => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        let result = await fetch(
            `${
        process.env.CT_ENV === 'production' ? process.env.REACT_APP_CARLA_HOST_PROD : process.env.REACT_APP_CARLA_HOST_DEV
      }${route}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'x-api-key': apiKey || process.env.REACT_APP_API_KEY
                }
            }
        );
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = responseType === 'BLOB' ? await result.blob() : await result.json();
        return result;
    } catch (err) {
        throw new Error(`Ha ocurrido un error. Intenta de nuevo más tarde. Error: ${err}`);
    }
};

export const postCarlaApi = async(route, body, responseType, apikey) => {
    try {
        let result = await parametrizedFetch(route, body, 'POST', apikey);
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = responseType === 'BLOB' ? await result.blob() : await result.json();
        return result;
    } catch (err) {
        console.log(err);
        throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
    }
};

export const putCarlaApi = async(route, body, apikey) => {
    try {
        let result = await parametrizedFetch(route, body, 'PUT', apikey);
        if (result.status !== 200) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
        result = await result.json();
        return result;
    } catch (err) {
        throw new Error(`Ha ocurrido un error. Intenta de nuevo más tarde. Error: ${err}`);
    }
};

export const deleteCarlaApi = async(route) => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        let result = await fetch(
            `${
        process.env.CT_ENV === 'production' ? process.env.REACT_APP_CARLA_HOST_PROD : process.env.REACT_APP_CARLA_HOST_DEV
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

const parametrizedFetch = async(route, body, method, apiKey) => {
    const headers = { 'Content-Type': 'application/json' };
    if (!apiKey) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(
        `${
      process.env.CT_ENV === 'production' ? process.env.REACT_APP_CARLA_HOST_PROD : process.env.REACT_APP_CARLA_HOST_DEV
    }${route}`, {
            method,
            headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey || process.env.REACT_APP_API_KEY },
            body: JSON.stringify(body)
        }
    );
};