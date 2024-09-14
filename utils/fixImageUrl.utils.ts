export const fixImageUrl = (url: string) => {
  if (url && !url.startsWith("http")) {
    return `https://${url}`;
  }
  return url;
};
