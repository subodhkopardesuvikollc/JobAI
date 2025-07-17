export const formatFileName = (fileName: string) => {
  return fileName
    .split(".")[0]
    .replaceAll("_", " ")
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
