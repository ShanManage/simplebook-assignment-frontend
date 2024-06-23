
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';

import { AppDispatch, RootState } from '../../redux';
import { clearAlert } from '../../redux/slice';
import { AlertDto } from '../../interfaces';
import { Button } from 'antd';

function UseNotifier() {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const notifications: AlertDto[] = useSelector((state: RootState) => state.alert.notifications);

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        enqueueSnackbar(
          notification.message,
          {
            persist: notification.options.persist ?? false,
            variant: notification.options.variant,
            key: notification.options.key,
            preventDuplicate: true,
            style: { borderRadius: '10px' },
            autoHideDuration: notification.options.autoHideDuration ?? 4000,
            anchorOrigin: {
              vertical: notification.options.anchorOrigin?.vertical ?? 'bottom',
              horizontal: notification.options.anchorOrigin?.horizontal ?? 'right',
            },
            action: key => (
              <Button color='inherit' size='small'
              style={{ backgroundColor: 'inherit', color: 'white' }}
              onClick={() => { closeSnackbar(key) }}>Dismiss</Button>
            ),
          },
        );
      });
      setTimeout(() => {
        dispatch(clearAlert());
      }, 4000);
    }
  }, [notifications]);

  return null; // This component doesn't render anything in the DOM
}

export default UseNotifier;
