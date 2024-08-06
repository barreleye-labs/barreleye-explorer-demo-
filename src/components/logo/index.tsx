import { useNavigate } from 'react-router-dom';

import { Logo } from './styles';

const BarreleyeLogo = () => {
  const navigate = useNavigate();
  return (
    <Logo>
      <span onClick={() => navigate('/')} className="bold">
        Barreleye
      </span>
      &nbsp;
      <span onClick={() => navigate('/')}>scan</span>
    </Logo>
  );
};

export default BarreleyeLogo;
