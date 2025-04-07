export const apiURL = (...parts: string[]): string => {
  const urlParts = [import.meta.env.VITE_API_BASE_URL, ...parts];
  return urlParts
    .map((pathPart) => pathPart.replace(/(^\/|\/$)/g, ""))
    .join("/");
};
