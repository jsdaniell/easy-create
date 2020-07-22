export const TOKEN_KEY = '@Revobank-Token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const logout = () => {
  localStorage.clear();
};
