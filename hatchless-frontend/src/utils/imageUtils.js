const hatchlessImageBaseUrl = import.meta.env.VITE_HATCHLESS_IMAGE_BASE_URL;

export const getFlyDefaultImageUrl = (flyCategory) => {
  if (!flyCategory) {
    return `${hatchlessImageBaseUrl}/hatchless-default.jpg`;
  }

  const formattedCategory = flyCategory.toLowerCase().replace(/\s+/g, '-');
  return `${hatchlessImageBaseUrl}/hatchless-${formattedCategory}.jpg`;
}