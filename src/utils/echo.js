import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

Pusher.logToConsole = true

let echo = null;

export const createEcho = (token) => {
    if (echo) {
        return echo;
    }

    echo = new Echo({
        broadcaster: "pusher",

        key: "76870f1c1806cc303ab9",

        cluster: "eu",

        forceTLS: true,

        encrypted: true,

        // authEndpoint: 'http://127.0.0.1:8000/api/admin/broadcasting/auth',

        authEndpoint: `https://phplaravel-1626350-6427540.cloudwaysapps.com/api/admin/broadcasting/auth`,

        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        },
    });

    return echo;
};

// export const disconnectEcho = () => {
//     if (echo) {
//         echo.disconnect();
//         echo = null;
//     }
// };
