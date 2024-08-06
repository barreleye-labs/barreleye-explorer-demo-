import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ListItemContent, ListItemDecorator } from '@mui/joy';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';

import { type RouteContent } from '../routes';

interface Props {
  content: RouteContent[];
  onClick: () => void;
}

const MenuItems = memo(({ content, onClick }: Props) => {
  const { pathname } = useLocation();

  const getSelected = (path: string) => {
    const currentPath = pathname.split('/')[1];
    return currentPath === path.slice(1) || currentPath === path.slice(1, -1);
  };

  return (
    <div className="gap">
      {content.map((item: RouteContent, index: number) => (
        <Link to={item.path} key={index} onClick={onClick}>
          <ListItem>
            <ListItemButton className="menu-item" selected={getSelected(item.path)} variant="plain">
              <ListItemDecorator>{item.icon && <item.icon />}</ListItemDecorator>
              <ListItemContent>{item.title}</ListItemContent>
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </div>
  );
});

export default MenuItems;
