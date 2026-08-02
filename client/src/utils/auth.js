
import { jwtDecode } from "jwt-decode";

export function getUserId() {

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {

    const decoded = jwtDecode(token);

    // Check token expiry
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {

      localStorage.removeItem("token");

      return null;
    }

    return decoded.id;

  } catch (error) {

    console.log("Invalid token");

    localStorage.removeItem("token");

    return null;

  }

}

