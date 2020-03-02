import { NavigationActions } from 'react-navigation';
let navigator;

export default class NavigationService {

    static setNavigator(navagatorRef) {
        navigator = navagatorRef;
    }

    static navigate(routeName, params) {
        // console.log(navigator)
        navigator.dispatch(
            NavigationActions.navigate({ routeName, params })
        );
    }

}

