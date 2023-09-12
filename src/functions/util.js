
export function isTokenExpired(tokenExpiration) {
    const now = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
    return now >= tokenExpiration;
  }