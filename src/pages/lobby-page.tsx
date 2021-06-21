import React from "react";
import BottomNavbar from "../components/navigation/bottom-navbar";
import { LobbyContainer } from "../components/lobby/lobby-container";

export const LobbyPage: React.FC = () => {

    return (
        <div>
            <LobbyContainer />
            <BottomNavbar />
        </div>
        
    )
}
