import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Config } from '../../util/config';

/**
 * Websocket context state interface.
 */
interface WebsocketContextState {
    socket: Socket;
}

/**
 * Websocket context.
 * 
 * This context is used to gets an unique socket connected with the API from any component.
 */
export const WebsocketContext = React.createContext<WebsocketContextState>({ socket: null });

/**
 * Websocket provider component.
 * 
 * This component will connect a socket to the API and sets it on the websocket context state.
 * 
 * @param props Properties
 */
export const WebsocketProvider: React.FC = (props) => {
    const [socket, setSocket] = useState<Socket>(null);

    useEffect(() => {
        setSocket(io(Config.WEBSOCKET_URL));
        return () => {
            if (socket != null && socket.connected) {
                socket.disconnect();
            }
        }
    }, []);

    return (
        <WebsocketContext.Provider value={{ socket }}>{props.children}</WebsocketContext.Provider>
    )
}
