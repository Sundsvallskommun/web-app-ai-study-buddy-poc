export const relativePath = (...parts: string[]): string => {
  const urlParts = [import.meta.env.VITE_BASE_PATH, ...parts];
  return urlParts
    .map((pathPart) => pathPart.replace(/(^\/|\/$)/g, ""))
    .join("/");
};
