
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/config";
export const httpCallFunction = (route,body)=>{
    const apiFunction = httpsCallable(functions, route)
    return apiFunction(body)
}
 