export interface Token {
    id: number;
    tokenable_type: string;
    tokenable_id: number;
    name: string;
    abilities: string[];
    last_used_at: Date;
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    tokens?: Token[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash?: { message?: string };
};
