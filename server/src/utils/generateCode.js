export const generateCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 7 })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};
