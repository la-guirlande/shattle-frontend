import { AuthenticationContainer } from "../components/authentication/authentication-container";
import { LocalStorageKey } from "../util/local-storage";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AccountContainer } from "../components/account/account-container";

export const AccountPage: React.FC = () => {

    return (
        <AccountContainer />
    )
}
