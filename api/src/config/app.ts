interface App {
    web_url: string,
    port: number,
    jwt: {
        secret: string,
        config: {
            issuer: string,
            audience: string
        }
    },
    salt_round: number
}

export default {
    web_url: process.env.WEB_URL ?? "http://localhost:8080",
    port: process.env.APP_PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
        config: {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }
    },
    salt_round: 10
} as App;
