import {config} from "dotenv";

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3002,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        AUTH: '/auth',
        USERS: '/users',
        COMMENTS: '/comments',
        SECURITY_DEVICES: '/security',
        TESTING: '/testing/all-data'
    },
    COLLECTION_NAME: {
        BLOG: process.env.BLOG_COLLECTION_NAME || '',
        POST: process.env.POST_COLLECTION_NAME || '',
        USER: process.env.USER_COLLECTION_NAME || '',
        COMMENT: process.env.COMMENT_COLLECTION_NAME || '',
        REFRESH_TOKEN: process.env.REFRESH_TOKEN_COLLECTION_NAME || '',
        API_CALLS: process.env.API_CALLS_COLLECTION_NAME || '',
        DEVICE_SESSIONS: process.env.DEVICE_SESSIONS_COLLECTION_NAME || '',
        LIKES: process.env.LIKES_COLLECTION_NAME || '',
    },
    AUTH_SECRETS: {
        ADMIN_AUTH: process.env.ADMIN_AUTH || '',
        SECRET_KEY: process.env.SECRET_KEY || ''
    },
    TOKEN: {
        ACCESS_TOKEN_DURATION: process.env.ACCESS_TOKEN_DURATION || '',
        REFRESH_TOKEN_DURATION: process.env.REFRESH_TOKEN_DURATION || ''
    },
    DATA_BASE: {
        MONGO_URL: process.env.MONGO_URL || '',
        DB_NAME: process.env.DB_NAME || ''
    },
    EMAIL_CREDENTIALS: {
        EMAIL: process.env.EMAIL || '',
        EMAIL_PASS: process.env.EMAIL_PASS || ''
    },
    API_CALLS: {
        TIME_LIMIT: process.env.TIME_LIMIT_API_CALLS || '',
        NUMBER_LIMIT: process.env.NUMBER_LIMIT_API_CALLS || ''
    }
}