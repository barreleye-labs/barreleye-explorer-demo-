import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Card, Chip, Stack, Typography } from '@mui/joy';
import IconButtonJoy from '@mui/joy/IconButton';
import Divider from '@mui/material/Divider';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { Char } from '@utils';

import { NodeConfig } from '@src/config/nodeConfig.ts';

import { CardContainer, CardContent } from './styles';

interface Props {
  config: NodeConfig;
  src: string;
  address: string;
  nonce: string;
  balance: string;
  title: string;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function AvatarCard({ src, address, config, balance, nonce, title }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const onCopy = (value: string) => {
    navigator.clipboard?.writeText(value);
  };

  return (
    <CardContainer>
      <Card
        className={open ? 'active' : ''}
        sx={(theme) => ({
          width: 320,
          maxWidth: '100%',
          boxShadow: 'lg',
          '&:hover': {
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
            transform: 'scale(1.05)'
          },
          transition: 'transform 0.5s, transform 0.3s'
        })}
      >
        <CardContent onClick={handleOpen} sx={{ alignItems: 'center' }}>
          <Avatar src={src} sx={{ '--Avatar-size': '8rem' }} />
          <Chip
            size="sm"
            variant="soft"
            color="primary"
            sx={{
              mt: -1,
              mb: 1,
              border: '3px solid',
              borderColor: 'background.surface'
            }}
          >
            Node
          </Chip>
          <div className="title-wrapper">
            <Typography className="title" level="title-md">
              {title}
            </Typography>
          </div>

          <div className="content-wrapper">
            <div className="left">
              <Typography className="value" level="body-sm">
                {Char.hexToBalance(balance)}
              </Typography>

              <Typography className="key" level="body-sm">
                Barrel
              </Typography>
            </div>
            <div className="divider"></div>
            <div className="right">
              <Typography className="value" level="body-sm">
                {Char.hexToDecimal(nonce)}
              </Typography>
              <Typography className="key" level="body-sm">
                nonce
              </Typography>
            </div>
          </div>
          <ExpandMore expand={open} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardContent>

        <div className="card-flap-wrapper">
          <div className="card-flap flap1">
            <Typography color="neutral" level="body-md" fontWeight="lg">
              Address
              <Tooltip title="Copy Address" placement="top">
                <span className="copy-icon" onClick={() => onCopy(Char.add0x(address))}>
                  <ContentCopyIcon />
                </span>
              </Tooltip>
            </Typography>
            <Typography className="value" fontWeight="md">
              {Char.add0x(address)}
            </Typography>

            <Typography color="neutral" level="body-md" fontWeight="lg">
              API
              <Tooltip title="Copy API" placement="top">
                <span className="copy-icon" onClick={() => onCopy(config.API)}>
                  <ContentCopyIcon />
                </span>
              </Tooltip>
            </Typography>
            <Typography className="value" fontWeight="md">
              {config.API}
            </Typography>

            <div className="card-flap flap2">
              <Typography color="neutral" level="body-md" fontWeight="lg">
                P2P Endpoint
                <Tooltip title="Copy P2P Endpoint" placement="top">
                  <span className="copy-icon" onClick={() => onCopy(config.P2P_END_POINT)}>
                    <ContentCopyIcon />
                  </span>
                </Tooltip>
              </Typography>
              <Typography className="value" fontWeight="md">
                {config.P2P_END_POINT}
              </Typography>

              <Stack
                className="icons"
                justifyContent="center"
                alignItems="center"
                direction="row"
                spacing={2}
                divider={<Divider variant="middle" orientation="vertical" flexItem />}
              >
                {config.github && (
                  <Tooltip title={`${title} Github`} placement="top">
                    <a href={config.github} target="_blank">
                      <IconButtonJoy variant="soft">
                        <GitHubIcon />
                      </IconButtonJoy>
                    </a>
                  </Tooltip>
                )}
                {config.email && (
                  <Tooltip title={`${title} Eamil`} placement="top">
                    <a href={`mailto:${config.email}`}>
                      <IconButtonJoy variant="soft">
                        <SendIcon />
                      </IconButtonJoy>
                    </a>
                  </Tooltip>
                )}
                {config.linkedIn && (
                  <Tooltip title={`${title} LinkedIn`} placement="top">
                    <a href={config.linkedIn} target="_blank">
                      <IconButtonJoy variant="soft">
                        <LinkedInIcon />
                      </IconButtonJoy>
                    </a>
                  </Tooltip>
                )}
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </CardContainer>
  );
}
