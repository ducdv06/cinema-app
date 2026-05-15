import storage from "./storage";

// Hàm này chỉ dùng để xóa toàn bộ storage khi cần reset app
// KHÔNG gọi trong app chính, chỉ dùng khi debug
export const clearAllStorage = async () => {
  try {
    await storage.removeItem("@CinemaApp:users");
    await storage.removeItem("@CinemaApp:currentUser");
    await storage.removeItem("@CinemaApp:wishlist");
    console.log("Đã xóa toàn bộ storage");
  } catch (error) {
    console.error("Lỗi xóa storage:", error);
  }
};