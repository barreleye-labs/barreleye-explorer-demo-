import { useCallback } from 'react';

import { useSnackbar } from 'notistack';

interface ShowToastParams {
  variant: 'success' | 'error';
  message: string;
}

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = useCallback(
    ({ variant, message }: ShowToastParams) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    },
    [enqueueSnackbar]
  );

  return showToast;
};

export default useToast;
