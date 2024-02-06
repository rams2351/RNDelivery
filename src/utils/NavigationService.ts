import { NavigationContainerRef, Route, StackActions } from "@react-navigation/native";
import React from "react";
import { _showErrorMessage } from "./Helpers";

const navigationRef: React.MutableRefObject<NavigationContainerRef<any> | null> = React.createRef();

const setNavigationRef = (ref: any) => navigationRef.current = ref;

const navigate = (name: string, params: any = {}, merge: boolean = true) => {
    navigationRef?.current?.removeListener
    navigationRef?.current?.navigate({ name, params, merge });
};

const push = (name: string, params: any = {}) => {
    navigationRef?.current?.removeListener
    navigationRef?.current?.dispatch(StackActions.push(name, params));
};

const getCurrentScreen = (): Route<string, any> | undefined => {
    navigationRef?.current?.removeListener
    return navigationRef?.current?.getCurrentRoute();
};

const replace = (name: string, params: any = {}) => {
    const rootState = navigationRef?.current?.getRootState();
    if (rootState?.routes && rootState?.index) {
        if (
            rootState?.routes.length > rootState?.index && rootState?.routes[rootState?.index - 1].name == name
        ) {
            goBack();
            return;
        }
    }
    navigationRef?.current?.dispatch(StackActions.replace(name, params));
}


const goBack = () => {
    try {
    navigationRef?.current?.removeListener
        navigationRef?.current?.goBack();
    } catch (e: any) {
        _showErrorMessage(e)
    }
}

const getNavigation = () => {
    navigationRef?.current?.removeListener
    return navigationRef?.current
}

export const NavigationService = { getNavigation, setNavigationRef, getCurrentScreen, navigate, goBack, push, replace }