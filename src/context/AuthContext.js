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
    checkAndClearIfNeeded();
  }, []);

  const checkAndClearIfNeeded = async () => {
    try {
      const lastRunTime = await storage.getItem("@CinemaApp:lastRunTime");
      const currentTime = Date.now();
      const TIMEOUT_MS = 60000; // 60 giây
      
      console.log("=== KIỂM TRA THỜI GIAN CHẠY ===");
      console.log("Lần chạy trước:", lastRunTime);
      console.log("Thời gian hiện tại:", currentTime);
      
      if (lastRunTime) {
        const diff = currentTime - parseInt(lastRunTime);
        console.log("Chênh lệch:", diff, "ms");
        
        if (diff > TIMEOUT_MS) {
          // Quá 60 giây - xóa hết dữ liệu
          console.log("=== QUÁ 60 GIÂY - XÓA TOÀN BỘ DỮ LIỆU ===");
          await storage.removeItem("@CinemaApp:currentUser");
          await storage.removeItem("@CinemaApp:users");
          await storage.removeItem("@CinemaApp:wishlist");
          await storage.removeItem("@CinemaApp:resetOTP");
          setUser(null);
          console.log("✅ Đã xóa toàn bộ dữ liệu!");
        } else {
          // Dưới 60 giây - giữ nguyên user (auto login)
          console.log("=== DƯỚI 60 GIÂY - GIỮ NGUYÊN DỮ LIỆU (AUTO LOGIN) ===");
          const userJSON = await storage.getItem("@CinemaApp:currentUser");
          if (userJSON) {
            setUser(JSON.parse(userJSON));
            console.log("✅ Auto login thành công:", JSON.parse(userJSON).email);
          } else {
            setUser(null);
            console.log("❌ Không có user trong storage");
          }
        }
      } else {
        // Lần đầu chạy - xóa hết
        console.log("=== LẦN ĐẦU CHẠY - XÓA TOÀN BỘ DỮ LIỆU ===");
        await storage.removeItem("@CinemaApp:currentUser");
        await storage.removeItem("@CinemaApp:users");
        await storage.removeItem("@CinemaApp:wishlist");
        await storage.removeItem("@CinemaApp:resetOTP");
        setUser(null);
        console.log("✅ Đã xóa toàn bộ dữ liệu!");
      }
      
      // Cập nhật thời gian chạy hiện tại
      await storage.setItem("@CinemaApp:lastRunTime", currentTime.toString());
      
    } catch (error) {
      console.error("Lỗi kiểm tra:", error);
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
      console.log("=== LOGOUT ===");
      await storage.removeItem("@CinemaApp:currentUser");
      setUser(null);
      console.log("✅ Logout thành công");
    } catch (error) {
      console.error("Lỗi logout:", error);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      if (!user) return false;
      
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
      
      console.log("✅ Cập nhật user thành công");
      return true;
    } catch (error) {
      console.error("Lỗi update user:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};