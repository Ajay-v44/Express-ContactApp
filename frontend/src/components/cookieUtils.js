export const getJwtTokenFromCookie = () => {
  const cookieString = document.cookie;
  if (cookieString && cookieString.includes("jwtToken=")) {
    const cookieToken = cookieString
      .split("; ")
      .find((row) => row.startsWith("jwtToken="))
      .split("=")[1];
    return cookieToken;
  }
  return null;
};
