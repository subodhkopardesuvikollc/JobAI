export const formatFileName = (fileName: string) => {
  return fileName
    .split(".")[0]
    .replaceAll("_", " ")
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatFileScore = (score: string) => {
  return score.toString().split(".")[1].substring(0, 2);
};
