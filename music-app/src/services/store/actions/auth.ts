const login = (token: {}, user: string) => (
    { type: 'LOG_IN' , token, user}
);

const logout = () => (
    { type: 'LOG_OUT' }
);

const refreshToken = (token: {}) => (
    { type: 'REFRESH_TOKEN', token }
);

export { login, logout, refreshToken }