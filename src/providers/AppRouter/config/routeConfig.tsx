import { JSX } from "react";
import { MainPage } from "../../../pages/MainPage/MainPage";
import { SearchPage } from "../../../pages/SearchPage/SearchPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";

export type AppRouterProps = {
    path: string,
    element: JSX.Element,
    authOnly?: boolean
}

export const routeConfig: Record<string, AppRouterProps> = {
    main: {
        path: '/',
        element: <MainPage />,
    },
    search: {
        path: '/weather',
        element: <SearchPage />,
    },
    login: {
        path: '/login',
        element: <LoginPage />,
    },
    profile: {
        path: '/profile',
        element: <ProfilePage />,
        authOnly: true
    },
    // LAST
    notFound: {
        path: '*',
        element: <NotFoundPage />,
    },
};
