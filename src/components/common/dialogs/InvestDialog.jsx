import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Dialog, Card, CardContent, Divider, Slide } from '@mui/material';
import PagesHeaderBar from '../PagesHeaderBar';
import PoolTextField from '../../dashboard/pools/PoolTextField';
import { getApi } from '../../api/apiManager';
import { useToastContext } from '../../../providers/ToastProvider';
import { sendMessage } from '../../api/messageManager';

const InvestDialog = ({openDialog, closeDialog, stacked, setStacked, basketName, user}) => {

  const toast = useToastContext()
  const notifyBasketBuy = async () => {
    const date = new Date().toLocaleDateString();
    await sendMessage(toast, {
      user: user.id,
/*       date: date,
 */      type: 2,
      state: 1,
      subject: 'Buy Request',
      msg: `${user.name} ${user.lastName} Request add additional funds to (${basketName}) basket ${date}`,
    })
    .then( () => {
      //setOpenBackdrop(false);
      closeDialog();
    })
  };
  
  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      TransitionComponent={Transition}
      keepMounted
    >
      <Card sx={{bgcolor: theme => theme.palette.secondary.light}}>
        <CardContent>
          <PagesHeaderBar
            title='Invest in Basket'
            subTitle='Select the amount you wish to invest.'
          />
          <Divider />
          <PoolTextField
            mainText={`${basketName}`}
            stacked={stacked}
            handleBoughtInfoChange={(event) => {
              setStacked(event);
            }}
            selectedPool={{ short_name: 'USDT' }}
            action={() =>  notifyBasketBuy(stacked) }
          />
        </CardContent>
      </Card>
    </Dialog>
  )
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

InvestDialog.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  stacked: PropTypes.number,
  setStacked: PropTypes.func,
  basketName: PropTypes.string,
  user: PropTypes.obj,
}

export default InvestDialog;