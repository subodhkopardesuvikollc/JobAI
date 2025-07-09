export const formatFileName = (fileName: string) => {
  return fileName
    .split(".")[0]
    .replaceAll("_", " ")
    .split(" ")
    .slice(0, 2)
    .join(" ");
};
