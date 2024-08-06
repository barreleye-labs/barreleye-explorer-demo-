import { SnackbarProvider } from 'notistack';

import DefaultLayout from '@layouts/default';

import Logo from '@components/logo';
import Menu from '@components/menu';

import { Container, Sider } from './styles';

const Layout = () => {
  return (
    <Container>
      <SnackbarProvider maxSnack={3}>
        <Sider className="menu">
          <Logo />
          <Menu />
        </Sider>

        <DefaultLayout />
      </SnackbarProvider>
    </Container>
  );
};

export default Layout;
