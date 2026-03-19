export interface User {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    role?: 'admin' | 'architect' | 'user';
    password?: string;
    urlimage?: string;
    cellphoneNumber?: string;
    telephone?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    msg?: string;
}

export interface AuthErrorResponse {
    msg: string;
}
