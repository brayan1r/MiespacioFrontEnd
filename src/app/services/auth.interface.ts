export interface User {
    _id?: string;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    msg?: string;
}

export interface AuthErrorResponse {
    msg: string;
}
