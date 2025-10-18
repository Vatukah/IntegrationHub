
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE;
const LOCAL_SERVER_BASE_URL = import.meta.env.VITE_LOCAL_SERVER_BASE;
const environment = import.meta.env.VITE_ENV;


export const BASE_URL = environment === 'development'?LOCAL_SERVER_BASE_URL:SERVER_BASE_URL;

export const API_ENDPOINTS = {
    GOOGLE_CONNECT : `${BASE_URL}/api/gmail/connect`,
    GOOGLE_SEND: `${BASE_URL}/api/gmail/send`,
    ACTIVITY_LOG:`${BASE_URL}/activity-logs`,
    USER : {
        GET_CONNECTED_GMAIL : `${BASE_URL}/user/getGmail`,
    },
    GOOGLE_CALLBACK : `${BASE_URL}/api/gmail/callback`
}