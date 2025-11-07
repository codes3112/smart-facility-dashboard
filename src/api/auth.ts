export interface User {
  email: string;
  name: string;
}

let currentUser: User | null = null;

// Mock login
export async function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "password") {
        currentUser = { email, name: "Admin User" };
        resolve(currentUser);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}

// Mock logout
export async function logout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      resolve();
    }, 300);
  });
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentUser);
    }, 300);
  });
}
