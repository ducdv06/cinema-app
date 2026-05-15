import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = "@CinemaApp:wishlist";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist từ storage khi app khởi động
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const saved = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Lỗi load wishlist:", error);
    }
  };

  const saveWishlist = async (newWishlist) => {
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
    } catch (error) {
      console.error("Lỗi lưu wishlist:", error);
    }
  };

  const addToWishlist = (movie) => {
    setWishlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;
      const newList = [...prev, movie];
      saveWishlist(newList);
      return newList;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const newList = prev.filter((m) => m.id !== id);
      saveWishlist(newList);
      return newList;
    });
  };

  // THÊM HÀM toggleWishlist NÀY
  const toggleWishlist = (movie) => {
    const exists = wishlist.find((m) => m.id === movie.id);
    if (exists) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const isInWishlist = (id) => wishlist.some((m) => m.id === id);

  return (
    <WishlistContext.Provider
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        toggleWishlist,  // THÊM DÒNG NÀY
        isInWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}