export const BASE_URL = "http://localhost:8000"

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/user/register",
        LOGIN: "/api/user/login",
    },

    PRODUCT: {
        GET_ALL: "/api/product",
        GET_BY_ID: (id) => `/api/product/${id}`,
        CREATE: "/api/product",
        UPDATE: (id) => `/api/product/${id}`,
        DELETE: (id) => `/api/product/${id}`,
        DELETE_ALL: "/api/product/delete",
    },
}
