import { useNavigate } from 'react-router-dom';

import { TextLogo } from 'barrel-ui-kit';
import { SnackbarProvider } from 'notistack';

import DefaultLayout from '@layouts/default';

import Menu from '@components/menu';

import { Container, Sider } from './styles';

const Layout = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <SnackbarProvider maxSnack={3}>
        <Sider className="menu">
          <TextLogo bold="Barreleye" semi="scan" onClick={() => navigate('/')} />
          <Menu />
        </Sider>

        <DefaultLayout />
      </SnackbarProvider>
    </Container>
  );
};

export default Layout;
