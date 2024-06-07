export const getIdFromString = (string: string): string => {
  const convertedString = string.trim().toLowerCase();

  // If the string for some reason is empty, return a random UUID
  if (!convertedString) return crypto.randomUUID();

  return convertedString.replace(/[^a-zA-Z0-9]/g, "");
};
