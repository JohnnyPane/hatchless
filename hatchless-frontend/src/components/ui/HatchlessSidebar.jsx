import { Text, NavLink } from '@mantine/core'
import { useMe } from '../../hooks/useMe.js';
import './HatchlessSidebar.scss'

// const navStyle = {
//   root: {
//     "&:hover": {
//       backgroundColor: "black",
//     }
//   }
// };

const links = [
  { label: 'Home', path: '/' },
  { label: 'Rivers', path: '/rivers' },
  { label: 'Fly Shops', path: '/fly_shops' },
];

const HatchlessSidebar = () => {
  const { data: user } = useMe();

  if (user && !links.find(link => link.label === 'My Profile')) {
    links.push({ label: 'My Profile', path: `/users/${user.id}` });
  }

  if (user?.fly_shop && !links.find(link => link.label === 'My Fly Shop')) {
    links.push({ label: 'My Fly Shop', path: `/fly_shops/${user.fly_shop.id}/my_fly_shop` });
  }

  return (
    <div className="hatchless-sidebar">
      {links.map((link) => (
        <NavLink
          key={link.path}
          href={link.path}
          label={<Text size="lg" className="bold">{link.label}</Text>}
          className="bold"
          color="var(--mantine-color-troutStream)"
        />
      ))}
    </div>
  );
}

export default HatchlessSidebar;