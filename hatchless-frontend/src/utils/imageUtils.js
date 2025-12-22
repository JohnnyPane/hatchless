const rootURL = import.meta.env.VITE_API_ROOT_URL || '';

export const generateImageUrl = (imageURL) => {
  if (!imageURL) {
    return '';
  }

  if (imageURL.startsWith('http://') || imageURL.startsWith('https://')) {
    return imageURL;
  }

  return rootURL + imageURL;
}