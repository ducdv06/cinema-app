import React, { createContext, useState, useContext, useEffect } from "react";
import storage from "../utils/storage";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    try {
      console.log("=== AUTO LOGIN CHECK ===");
      const userJSON = await storage.getItem("@CinemaApp:currentUser");
      console.log("User từ storage:", userJSON);
      
      if (userJSON) {
        const userData = JSON.parse(userJSON);
        setUser(userData);
        console.log("✅ Auto login thành công:", userData.email);
      } else {
        console.log("❌ Không có user trong storage");
        setUser(null);
      }
    } catch (error) {
      console.error("Lỗi auto login:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("=== LOGIN ===");
      const usersJSON = await storage.getItem("@CinemaApp:users");
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const currentUser = {
          id: foundUser.id,
          fullName: foundUser.fullName,
          email: foundUser.email,
          phone: foundUser.phone || "",
          avatar: foundUser.avatar || null,
        };
        await storage.setItem("@CinemaApp:currentUser", JSON.stringify(currentUser));
        setUser(currentUser);
        console.log("✅ Login thành công:", currentUser.email);
        return true;
      }
      console.log("❌ Sai email hoặc mật khẩu");
      return false;
    } catch (error) {
      console.error("Lỗi login:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      console.log("=== REGISTER ===");
      const usersJSON = await storage.getItem("@CinemaApp:users");
      let users = usersJSON ? JSON.parse(usersJSON) : [];
      
      const emailExists = users.some(u => u.email === userData.email);
      if (emailExists) {
        console.log("❌ Email đã tồn tại");
        return null;
      }
      
      const newUser = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || "",
        avatar: null,
      };
      users.push(newUser);
      await storage.setItem("@CinemaApp:users", JSON.stringify(users));
      console.log("✅ Đăng ký thành công:", newUser.email);
      return newUser;
    } catch (error) {
      console.error("Lỗi register:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      console.log("=== LOGOUT - XÓA TOÀN BỘ DỮ LIỆU ===");
      // Xóa currentUser (session hiện tại)
      await storage.removeItem("@CinemaApp:currentUser");
      // Xóa toàn bộ users database
      await storage.removeItem("@CinemaApp:users");
      // Xóa wishlist
      await storage.removeItem("@CinemaApp:wishlist");
      // Xóa các dữ liệu khác nếu có
      await storage.removeItem("@CinemaApp:resetOTP");
      
      setUser(null);
      console.log("✅ Đã xóa toàn bộ dữ liệu user!");
    } catch (error) {
      console.error("Lỗi logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};