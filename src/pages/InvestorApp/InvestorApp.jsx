import { Grid, Typography } from "@mui/material"
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { getApi } from "../../components/api/apiManager";
import Layout from "../../components/common/layout/Layout";
import useMenuController, { menuOptions, menuOptionVariant } from "../../components/common/menu/MenuController";
import { useThemeContext } from "../../providers/ThemeProvider";
import { Auth } from 'aws-amplify';

const InvestorApp = ({ user, userInfo, triggerSessionValidation }) => {
  const [pools, setPools] = useState([]);
  const [selected, setSelected] = useMenuController()
  const [requestFilter, setRequestFilter] = useState(0);

  const theme = useThemeContext();
  useEffect(() => {
    theme.changeMode('light')
    const getBaskets = async () => {
      try {
        const data = await getApi('next-activos/getAllBaskets');
        setPools(data);
      } catch (err) {
        console.log(err)
      }
    };
    getBaskets();
    setSelected(menuOptions.Dashboard)
  }, []);

  const logout = async () => {
    await Auth.signOut({ global: true });
    triggerSessionValidation();
  };

  return (
    <Layout selected={selected} setSelected={(value) => setSelected(value)} setRequestFilter={(value) => setRequestFilter(value)} requestFilter={requestFilter} userInfo={userInfo} logout={logout}>
      {selected && selected.variant !== menuOptionVariant.Main && selected.page({ user, userInfo, pools, requestFilter, triggerSessionValidation })}
    </Layout>
  )
}

InvestorApp.propTypes = {
  user: PropTypes.object,
  userInfo: PropTypes.object,
  triggerSessionValidation: PropTypes.func,
};

export default InvestorApp