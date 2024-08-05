import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';

import { Char } from '@utils';

import { Breadcrumbs } from './styles';

const Breadcrumb = () => {
  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const [height, setHeight] = useState(locationArr[2]);

  useEffect(() => {
    setHeight(locationArr[2]);
  }, [height, locationArr]);

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb">
      {locationArr?.map((path, index) => {
        if (index > 0) {
          return <div key={index}>{path.length > 15 ? Char.ellipsisMiddle(path) : path.toUpperCase()}</div>;
        } else {
          return <HomeIcon key={index} sx={{ mr: 0.5 }} fontSize="inherit" />;
        }
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
