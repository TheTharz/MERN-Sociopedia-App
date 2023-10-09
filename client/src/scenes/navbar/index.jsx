import React from 'react';
import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const navBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch(); // dispatch function
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // get user from redux store
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)'); // check if screen is non mobile
  const theme = useTheme(); // get theme from material ui
  const neutralLight = theme.palette.neutral.light; // get neutral light color from theme
  const dark = theme.palette.neutral.dark; // get neutral dark color from theme
  const background = theme.palette.background.default; // get background color from theme
  const primaryColor = theme.palette.primary.light; // get primary color from theme
  const alt = theme.palette.alt; // get alt color from theme

  const fullName = `${user.firstName} ${user.lastName}`; // get full name of user

  return (
    <FlexBetween padding='1rem 6%' background={alt}>
      <FlexBetween gap='1.75 rem'>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem,2rem,2.25 rem)'
          color='primary'
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius='9px'
            gap='3rem'
            padding='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search...'>
              <IconButton>
                <Search />
              </IconButton>
            </InputBase>
          </FlexBetween>
        )}
      </FlexBetween>
      {/*Desktop Menu*/}
      {isNonMobileScreen ? (
        <FlexBetween></FlexBetween>
      ) : (
        <IconButton></IconButton>
      )}
    </FlexBetween>
  );
};

export default navBar;

//navbar designed here components
