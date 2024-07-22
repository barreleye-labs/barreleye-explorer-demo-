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

  return (
    <div className="gap">
      {content?.map((item: RouteContent, index: number) => (
        <Link to={`${item.path}`} key={index}>
          <ListItem>
            <ListItemButton
              onClick={onClick}
              className="menu-item"
              disabled={false}
              selected={
                pathname.split('/')[1] === item.path.slice(1) || pathname.split('/')[1] === item.path.slice(1, -1)
              }
              variant="plain"
            >
              <ListItemDecorator component={item.icon}></ListItemDecorator>
              <ListItemContent>{item.title}</ListItemContent>
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </div>
  );
});

export default MenuItems;
