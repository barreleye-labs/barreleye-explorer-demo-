import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';

import { Char } from '@utils';

import { Breadcrumbs } from './styles';

const Breadcrumb = () => {
  const location = useLocation();

  const locationArr = useMemo(() => location.pathname.split('/'), [location.pathname]);

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb">
      {locationArr.map((path, index) => {
        if (location.pathname !== '/' && index === 0) {
          return <HomeIcon key={index} sx={{ mr: 0.5 }} fontSize="inherit" />;
        }
        if (index > 0 && path) {
          return <div key={index}>{path.length > 15 ? Char.ellipsisMiddle(path) : path.toUpperCase()}</div>;
        }
        return null;
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
