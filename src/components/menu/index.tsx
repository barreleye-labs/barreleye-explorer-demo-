import { useCallback, useState } from 'react';

import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/joy/Button';
import ListJoy from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';

import { Container } from '@components/menu/styles';

import MenuItems from './components/MenuItems';
import { type Route, routes } from './routes';

const Menu = () => {
  const [active, setActive] = useState(false);
  const toggleMenu = useCallback(() => {
    setActive((prevActive) => !prevActive);
  }, []);

  return (
    <Container>
      <div>
        <div className="menu-icon" onClick={toggleMenu}>
          <SortIcon />
        </div>
        <ListJoy className={`menu-list ${active ? 'active' : ''}`}>
          {routes.map((route: Route, index: number) => (
            <div className="menu-block" key={index}>
              <ListSubheader>{route.category}</ListSubheader>
              <MenuItems content={route.content} onClick={toggleMenu} />
            </div>
          ))}
        </ListJoy>
      </div>
      <div className={active ? 'active' : ''}>
        <div className="button-wrapper">
          <a
            className="link"
            href="https://github.com/barreleye-labs/barreleye"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="soft">
              Docs & Source Code
            </Button>
          </a>
          <p>
            Copyright © 2023 - 2024 Barreleye Team,
            <br /> All Rights Reserved.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Menu;
