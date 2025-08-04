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

export const htmlToPlainText = (html: string) => {
  const match = html?.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = match ? match[1] : html || "";
  return bodyContent.replace(/<br\s*\/?>/gi, "\n");
};

export const PlainTextToHtml = (content: string) => {
  const htmlContent = content.replace(/\n/g, "<br/>");
  return `<html><body>${htmlContent}</body></html>`;
};
