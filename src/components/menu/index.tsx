import { css } from '@emotion/react';
import { useCallback, useState } from 'react';

import MenuItems from './components/MenuItems';
import { type Route, routes } from './routes';

import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';

import { Container } from '@components/menu/styles';

const Menu = () => {
  const [active, setActive] = useState(false);
  const onClick = useCallback(() => {
    setActive(!active);
  }, [active]);
  return (
    <Container>
      <div className="menu-icon" onClick={onClick}>
        <MenuIcon />
      </div>
      <List className={`menu-list  ${active ? 'active' : ''}`}>
        {routes?.map((route: Route, index: number) => (
          <div className="menu-block" key={index}>
            <ListSubheader>{route.category}</ListSubheader>

            <MenuItems content={route.content} onClick={onClick} />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default Menu;
