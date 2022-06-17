export const TOKEN_KEY = "JWT_TOKEN"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem("ROLE");

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

export const login = (token:string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const setUserRole = (role: string) =>{
    localStorage.setItem("ROLE", role);
}