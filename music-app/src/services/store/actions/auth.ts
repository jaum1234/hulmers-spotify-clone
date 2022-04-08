const login = (token: {}, user: string) => (
    { type: 'LOG_IN' , token, user}
)

const logout = () => (
    { type: 'LOG_OUT' }
)

export { login, logout }