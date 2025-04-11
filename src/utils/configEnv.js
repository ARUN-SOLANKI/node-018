export const config = {
    port: process.env.PORT,
    dbName: process.env.DB_NAME,
    dbUrl: process.env.DB_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

}