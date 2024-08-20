import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useSessionStorage } from '@hooks';
import { AutoAwesome, RssFeed } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import { Chip } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { AccountService } from '@services';
import { commonPrivateKeyStore } from '@stores';
import { ResponsiveModal, Ripple } from 'barrel-ui-kit';

import Breadcrumb from '@components/breadcrumb';

import { Char, Crypto } from '@utils';

import { ButtonWrapper, Container } from './styles';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const {
    privateKey: commonPrivateKey,
    remove: removeCommonPrivateKey,
    set: setCommonPrivateKey,
    setAddress: setCommonAddress,
    address: commonAddress
  } = commonPrivateKeyStore();

  const [getSession, _, removeSession] = useSessionStorage<string>('key');
  const privateKey = getSession();
  const { data } = AccountService().GetOneByIdQuery(commonAddress && commonAddress, {
    refreshInterval: true
  });
  const modalHandle = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const onConfirm = () => {
    removeSession();
    removeCommonPrivateKey();

    modalHandle();
    navigate('/');
  };

  useEffect(() => {
    if (privateKey) {
      setCommonPrivateKey(privateKey.toString());
    }
  }, []);

  useEffect(() => {
    fetchAddress().then(() => {});
  }, [commonPrivateKey]);

  const fetchAddress = async () => {
    if (commonPrivateKey) {
      const value = (await Crypto.privateKeyToAddress(commonPrivateKey)) as string;

      setCommonAddress(value);
    }
  };

  const ellipsisMiddleAddress = useMemo(() => commonAddress && Char.ellipsisMiddle(commonAddress), [commonAddress]);
  return (
    <>
      <Container>
        <div>
          {/* Action Buttons */}
          <ButtonWrapper>
            {!privateKey ? (
              <Button variant="outlined" color="neutral" size="lg" onClick={() => navigate('/sign-in')}>
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="neutral"
                  size="lg"
                  startDecorator={<AutoAwesome />}
                  onClick={() => modalHandle()}
                >
                  Clear Private Key
                </Button>

                <HtmlTooltip
                  title={
                    <>
                      <Typography color="inherit">
                        <b>Balance: </b>
                        <em>{`${data?.account.balance ? Char.hexToBalance(data?.account.balance) : 0} Barrel`}</em>
                      </Typography>
                    </>
                  }
                >
                  <Button
                    variant="outlined"
                    color="neutral"
                    className="success"
                    startDecorator={<Ripple />}
                    size="lg"
                    onClick={() => navigate(`/account/${Char.add0x(commonAddress)}`)}
                  >
                    {Char.add0x(ellipsisMiddleAddress)}
                  </Button>
                </HtmlTooltip>
              </>
            )}
            <Chip className="responsive-mobile-none" label="Main Network" variant="outlined" icon={<RssFeed />} />
          </ButtonWrapper>

          <Breadcrumb />

          <Outlet />
        </div>
      </Container>

      <ResponsiveModal
        open={open}
        onConfirm={() => onConfirm()}
        onClose={() => setOpen(false)}
        title="Do you really want to clear your private key from your browser?"
        sub="This action will delete your private key stored in your browser’s storage. You’ll need to type in your private key again to check your balance or send Barrel."
      />
    </>
  );
};

export default DefaultLayout;
