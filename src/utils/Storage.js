// import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Burn it all to the ground.
 */
export function clear() {
  try {
    localStorage.clear();
  } catch (err) {
    console.log(err);
  }
}
