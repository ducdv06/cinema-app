import React, { createContext, useState, useContext, useEffect } from "react";
import storage from "../utils/storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJSON = await storage.getItem("@CinemaApp:currentUser");
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error("Lỗi khi load user:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await storage.setItem("@CinemaApp:currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      const usersJSON = await storage.getItem("@CinemaApp:users");
      if (usersJSON) {
        let users = JSON.parse(usersJSON);
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          users[index] = { ...users[index], ...updatedData };
          await storage.setItem("@CinemaApp:users", JSON.stringify(users));
        }
      }
      return true;
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await storage.removeItem("@CinemaApp:currentUser");
      setUser(null);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};