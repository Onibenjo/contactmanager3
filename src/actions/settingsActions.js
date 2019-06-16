import {
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from "./types";

export const setDisableBalOnAdd = () => {
    //Get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //Toggle
    settings.disableBalOnAdd = !settings.disableBalOnAdd;

    //Set back to localstorage
    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalOnAdd
    }
}
export const setDisableBalOnEdit = () => {
    //Get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //Toggle
    settings.disableBalOnEdit = !settings.disableBalOnEdit;

    //Set back to localstorage
    localStorage.setItem('settings', JSON.stringify(settings));
    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalOnEdit
    }
}
export const setAllowReg = () => {
    //Get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //Toggle
    settings.allowReg = !settings.allowReg;

    //Set back to localstorage
    localStorage.setItem('settings', JSON.stringify(settings));
    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowReg
    }
}