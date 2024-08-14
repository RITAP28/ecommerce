import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface User {
        isAuthenticated?: boolean;
    }
    interface Session {
        user: {
            isAuthenticated?: boolean;
        } & DefaultSession['user']
    }
}