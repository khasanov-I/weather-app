import {JSX, Suspense, memo, useCallback} from 'react';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom';
import {AppRouterProps, routeConfig} from '../config/routeConfig';
import {Layout} from './Layout';
import { useStores } from '../../../store/rootStore';

export const AppRouter = memo((): JSX.Element => {
    const {userStore} = useStores()
    const renderWithWrapper = useCallback((route: AppRouterProps) => {
        const element = (
            <Suspense fallback="Загрузка">
                {route.element}
            </Suspense>
        );
        if (route.authOnly && !userStore.authorized) {
            return <Navigate to="/" />
        }
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}/>
        );
    }, [userStore.authorized]);

    const router = createBrowserRouter(createRoutesFromElements(<Route element={<Layout />}>
        {Object.values(routeConfig).map(renderWithWrapper)}
    </Route>));

    return (
        <RouterProvider router={router} />
    );
});
