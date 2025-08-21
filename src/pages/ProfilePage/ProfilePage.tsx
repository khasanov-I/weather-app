import { observer } from "mobx-react-lite";
import { JSX } from "react";
import "./ProfilePage.css"
import { Stack } from "@mui/material";

const ProfilePage = (): JSX.Element => {

    return (
        <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
            <span>Страница пользователя Admin</span>
        </Stack>
    );
}

export default ProfilePage;