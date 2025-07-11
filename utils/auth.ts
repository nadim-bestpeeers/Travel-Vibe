export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
  return null;
};
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}
export const saveUser = (userId: string, name: string, role:string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    console.log("Role from save user:", role);
    if (role) {
      localStorage.setItem("role", role);
    }
  }
};
export const getRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role");
  }
  return null;
};

export const logout = () => {
  localStorage.clear();
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token");
  }
  return null;
};
