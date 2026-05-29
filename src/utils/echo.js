import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

// Pusher.logToConsole = true

let echo = null;

export const createEcho = (token) => {
    if (echo) {
        return echo;
    }

    echo = new Echo({
        broadcaster: "pusher",

        key: import.meta.env.VITE_PUSHER_APP_KEY,

        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,

        forceTLS: true,

        encrypted: true,

        authEndpoint: `${import.meta.env.VITE_API_URL}/admin/broadcasting/auth`,

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