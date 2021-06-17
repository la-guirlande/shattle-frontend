import { AuthenticationContainer } from "../components/authentication/authentication-container";
import { LocalStorageKey } from "../util/local-storage";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const LoginPage: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) != null) {
            history.push('/lobby');
        }
    }, []);

    return (
        <AuthenticationContainer />
    )
}
