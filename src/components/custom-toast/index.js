import React from 'react';
import Toast from '../toast';
import './index.scss';

export default {
  ...Toast,
  loading: () => Toast.show(<div className="custom-toast-loading" />, { duration: 0 }),
  show: content =>
    Toast.show(<div className="custom-toast-content">{content}</div>, { position: 'top', animation: 'bounce' }),
};
