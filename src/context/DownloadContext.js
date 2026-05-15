import React, { createContext, useContext, useState } from "react";

const DownloadContext = createContext();

export function DownloadProvider({ children }) {
  const [downloads, setDownloads] = useState([]);

  const addDownload = (movie) => {
    setDownloads((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;
      return [...prev, { ...movie, progress: 0, completed: false }];
    });

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDownloads((prev) =>
        prev.map((m) =>
          m.id === movie.id
            ? { ...m, progress, completed: progress >= 100 }
            : m,
        ),
      );
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  const removeDownload = (id) => {
    setDownloads((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <DownloadContext.Provider
      value={{ downloads, addDownload, removeDownload }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  return useContext(DownloadContext);
}
