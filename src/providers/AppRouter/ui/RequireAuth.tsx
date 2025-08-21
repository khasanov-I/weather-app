import {JSX} from 'react';

import {Navigate} from 'react-router-dom';
import { useStores } from '../../../store/rootStore';

type RequireAuthProps = {
    children: JSX.Element;
};

export function RequireAuth(props: RequireAuthProps) {
    const {children} = props;

    const {userStore} = useStores()

    if (!userStore.authorized) {
        return <Navigate to="/"/>;
    }

    return children;
}
