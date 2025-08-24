import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    email: String;
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

let logoutTimer: number | null = null;

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            login: (user, token) => {
                set({ user, token });

                const { exp } = jwtDecode<{ exp: number }>(token);
                const now = Date.now() / 1000;
                const delay = (exp - now) * 1000;

                if (logoutTimer) clearTimeout(logoutTimer);
                logoutTimer = setTimeout(() => {
                    set({ user: null, token: null });
                    console.log("auto-logged out: token expired.");
                }, delay);
            },

            logout: () => {
                set({ user: null, token: null });
                if (logoutTimer) clearTimeout(logoutTimer);
                logoutTimer = null;
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);