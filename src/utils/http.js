import axios from "axios"
import { store } from "../store/index";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux"; // Import the useSelector hook
const httpService = async (config = {}) => {
    try {
       // const jwtt = useSelector((state) => state.user.jwt);

        let { baseURL, endpoint, base, reqBody, jwt, successNotif, description } = { ...defaultConfig, ...config };
        if (endpoint === undefined || base === undefined) throw new Error("Endpoint not given");
        jwt = `Bearer ${store.getState().user.jwt}`;
        console.log(jwt)
        const res = await axios({
            method: endpoint[1],
            url: `${base}/${endpoint[0]}`,
            baseURL,
            data: reqBody,
            headers: { Authorization: jwt },
        })
        const { data: { responseCode, responseDescription, data }, status } = res;
        description = description || responseDescription;
        if (status === 200) {
            if (responseCode === "00") {
                if (successNotif) NotificationManager.success(description, "SUCCESS")
                return data;
            }
            else NotificationManager.warning(description, "ERROR")
        } else if (status === 400) NotificationManager.error(data.join("\n"));
        else NotificationManager.error(description);
        return false;
    } catch (e) {
        console.error(e);
        
        NotificationManager.error("Please contact system administrators", "ERROR");
        return false
    }
}

export default httpService

const defaultConfig = {
    baseURL: "http://localhost:3000/",
    endpoint: undefined,
    base: undefined,
    reqBody: {},
    jwt: undefined,
    successNotif: false,
    description: undefined
}

const methods = {
    post: "POST",
    get: "GET"
}

// endpoint url, method name, unauthorized
export const endpoints = {
  User: {
    base: "User",
    register: ["register", methods.post, true],
    login: ["login", methods.post, true],
  },
  Train: {
    base: "Train",
    inserttrain: ["inserttrain", methods.post],
    updateTrain: ["updateTrain", methods.post],
    deleteTrain: ["deleteTrain", methods.post],
  },
//   schedules: {
//     base: "schedules",
//     makeSchedule: ["makeSchedule", methods.post],
//     uploadSchedule: ["uploadSchedule", methods.post],
//     getAppInfo: ["getAppInfo", methods.get],
//     saveSchedule: ["saveSchedule", methods.post],
//     getSaveSchedule: ["getSaveSchedule", methods.get],
//   },
};

/*
    async () => {
        const res = await httpService({
        endpoint: endpoints.auth.login,
        base: endpoints.auth.base,
        reqBody: { erp: 25252, password: "password" },
        successNotif: true
        })
        console.log(res)
    }}
*/