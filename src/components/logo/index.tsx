import { useNavigate } from 'react-router-dom';

import Link from '@components/link';

import { Logo } from './styles';

const BarreleyeLogo = () => {
  const navigate = useNavigate();
  return (
    <Logo>
      <span onClick={() => navigate('/dashboard')} className="bold">
        Barreleye
      </span>
      &nbsp;
      <span onClick={() => navigate('/dashboard')}>scan</span>
    </Logo>
  );
};

export default BarreleyeLogo;
