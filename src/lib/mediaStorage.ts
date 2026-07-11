/**
 * ESTARR Media Storage Utility
 * Manages device-level binary persistence via IndexedDB for videos and photos,
 * and provides client-side image compression to optimize Firestore storage.
 */

const DB_NAME = "EstarrMediaDB";
const STORE_NAME = "media";
const DB_VERSION = 1;

/**
 * Initializes the IndexedDB database.
 */
function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Saves a binary Blob or File into IndexedDB under a unique key.
 */
export async function saveLocalMedia(key: string, data: Blob | string): Promise<void> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to save media to IndexedDB:", error);
  }
}

/**
 * Retrieves local media from IndexedDB as a Blob or String.
 */
export async function getLocalMedia(key: string): Promise<Blob | string | null> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to fetch media from IndexedDB:", error);
    return null;
  }
}

/**
 * Deletes media from IndexedDB.
 */
export async function deleteLocalMedia(key: string): Promise<void> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to delete media from IndexedDB:", error);
  }
}

/**
 * Compresses an image to fit Firestore's document size limitations.
 * Resizes the image to a maximum dimension while maintaining aspect ratio,
 * and outputs a highly compressed JPEG data URL.
 */
export function compressImage(
  dataUrl: string,
  maxWidth = 800,
  maxHeight = 600,
  quality = 0.6
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl); // Fallback to uncompressed if canvas is not supported
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
}
