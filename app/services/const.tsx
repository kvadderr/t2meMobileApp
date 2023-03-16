import { io } from "socket.io-client";

export const socket = io.connect("http://95.213.216.132:4000/");
export const BACKEND_URL = 'http://95.213.216.132:4000/';
export const Images = {
    menus: [
        require('../../assets/img.png'),
        require('../../assets/support.png')
    ],
};