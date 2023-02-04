import { io } from "socket.io-client";

export const socket = io.connect("http://192.168.230.8:4000/");
export const BACKEND_URL = 'http://192.168.230.8:4000/';
export const Images = {
    menus: [
        require('../../assets/img.png'),
        require('../../assets/support.png')
    ],
};