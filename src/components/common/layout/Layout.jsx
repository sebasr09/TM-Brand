import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import { Container, Divider, Drawer, CssBaseline, IconButton } from '@mui/material';
import MenuDesktop from '../menu/MenuDesktop';
import HeaderMobile from '../header/HeaderMobile';
import HeaderDesktop from '../header/HeaderDesktop';
import { useMediaQuery } from 'react-responsive';
import { ToastProvider } from '../../../providers/ToastProvider';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ selected, setSelected, setRequestFilter, requestFilter, userInfo, children, logout }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ToastProvider>
      <Container sx={{ display: isMobile ? 'block' : 'flex' }} maxWidth='100%'>
        <CssBaseline />
        
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{
              mr: 2, display: { md: 'none' }, position: 'fixed',
              bottom: 0,
              right: 0,
              padding: '1em',
              bgcolor: theme => theme.palette.white.main,
              color: theme => theme.palette.primary.main,
              zIndex: 9,
            }}
          >
            <MenuIcon />
          </IconButton>
          {isMobile && <>
          <HeaderMobile userInfo={userInfo} />

        </> }
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
                flexShrink: 0,
                borderRadius: '0',
                zIndex:0
              },

              width: 240
            }}
          >
            <HeaderDesktop userInfo={userInfo} />
            <MenuDesktop selected={selected} setSelected={setSelected} setRequestFilter={setRequestFilter} requestFilter={requestFilter} setMobileOpen={setMobileOpen} logout={logout} userInfo={userInfo} />
            <div style={{
              position: 'fixed',
              bottom: 0,
              padding: '1em',
              color: 'inherit',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: 'inherit',
            }} >
              <img
                src={'/images/TradeMate.svg'}
                alt='Logo Trade Mate'
                width='160'
                height='auto'
              />
            </div>

          </Drawer>
        

        {children}

      </Container>
    </ToastProvider>
  )
}

Layout.propTypes = {
  selected: PropTypes.object,
  setSelected: PropTypes.func,
  setRequestFilter: PropTypes.func,
  requestFilter: PropTypes.number,
  userInfo: PropTypes.object,
  children: PropTypes.obj,
  logout: PropTypes.func,
}

export default Layout