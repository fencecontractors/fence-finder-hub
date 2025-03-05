
// Simple admin authentication utility
// In a production environment, this should be replaced with proper authentication

const ADMIN_PASSWORD = "Control11@yahoo.com";
const AUTH_STORAGE_KEY = "fence_admin_auth";

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

export const authenticateAdmin = (password: string): boolean => {
  const isValid = password === ADMIN_PASSWORD;
  
  if (isValid) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  }
  
  return isValid;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Function to verify if user has admin rights before performing an action
export const requireAdminAuth = <T>(action: () => T): T | never => {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized: Admin authentication required");
  }
  
  return action();
};
