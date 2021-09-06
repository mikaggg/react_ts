import React from "react";
import { Data } from "../admin/AdminPage";

export const SiteContext = React.createContext<{ state: SiteState, dispatch: (value :{
    type: string;
    payload: Data;
}) => void}| undefined>(undefined);

interface SiteState {
    process: string,
    post: {},
}

export const initialState: SiteState = {
    process: "",
    post: {}
};

export const siteDataReducer = (state: SiteState, action: {type: string, payload: Data}) => {
    switch(action.type) {
        case 'DETAIL':
            return {
                process: "detail",
                post: action.payload,
            }
        case 'DELETE':
            return {
                process: "delete",
                post: action.payload,
            }
        default:
            return state
    }
};