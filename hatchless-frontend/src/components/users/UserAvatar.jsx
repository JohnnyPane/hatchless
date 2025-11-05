import { Image } from '@mantine/core';
import { generateImageUrl } from "../../utils/imageUtils.js";

const UserAvatar = ({ avatarUrl, size = 100 }) => {
  const url = generateImageUrl(avatarUrl);

  return (
    <div style={{ width: size, height: size }}>
      <Image
        src={url || ''}
        alt="User Avatar"
        width={size}
        height={size}
        radius="50%"
      />
    </div>
  );
}

export default UserAvatar;