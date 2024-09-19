export const fixImageUrl = (url: string) => {
  console.log("url inside fixImageUrl", url);

  if (((url && !url.startsWith("http")) || url === "") && url !== null) {
    return `https://${url}`;
  }
  return url;
};
