export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const getToken = () => {
  return localStorage.getItem("token");
};
export const saveUser = (userId: string, name: string) => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("name", name);
};

export const logout = () => {
  localStorage.clear();
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
