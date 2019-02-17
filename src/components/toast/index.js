import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import successImg from './images/success.png';
import failureImg from './images/failure.png';
import loadingImg from './images/loading.png';
import './index.scss';

let toastHandle = null;
const defaultIcon = {
  success: successImg,
  fail: failureImg,
  loading: loadingImg,
};

class Toast extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    icon: PropTypes.string,
    iconSpin: PropTypes.bool,
    position: PropTypes.oneOf(['top', 'middle', 'bottom']),
    animation: PropTypes.oneOf(['fade', 'bounce']),
    mask: PropTypes.bool,
    destory: PropTypes.func,
  }

  static defaultProps = {
    content: '',
    icon: '',
    iconSpin: false,
    position: 'middle',
    animation: 'fade',
    mask: true,
    destory: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  onExited = () => {
    this.props.destory();
  }

  render() {
    const {
      content, icon, iconSpin, position, animation, mask,
    } = this.props;
    const { visible } = this.state;

    return (
      <div className={`toast ${mask ? '' : 'no-mask'}`}>
        <CSSTransition
          in={visible}
          appear
          classNames={`toast-${animation}`}
          timeout={300}
          onExited={this.onExited}
        >
          <div className={`toast-container ${position}`}>
            {React.isValidElement(content) ? (
              content
            ) : (
              <div className="toast-content">
                {icon && <img src={defaultIcon[icon] || icon} alt="" className={iconSpin ? 'spin' : ''} />}
                {content && <div>{content}</div>}
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

function render(props) {
  const { duration } = props;
  const div = document.createElement('div');
  let timeout = null;

  document.body.appendChild(div);

  function destory() {
    const isUnmounted = ReactDOM.unmountComponentAtNode(div);
    if (isUnmounted && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    clearTimeout(timeout);
    toastHandle = null;
  }

  let toastInstance = null;
  function close() {
    toastInstance && toastInstance.close();
    toastInstance = null;
  }

  ReactDOM.render(<Toast {...props} destory={destory} />, div, function cb() {
    toastInstance = this;
  });

  if (toastHandle) {
    toastHandle.destory();
  }

  toastHandle = {
    close,
    destory,
  };

  return new Promise((resolve) => {
    if (duration > 0) {
      timeout = setTimeout(() => {
        close();
        resolve();
      }, duration);
    }
  });
}

let defaultConfig = {
  duration: 1500,
  icon: '',
  iconSpin: false,
  position: 'middle',
  animation: 'fade',
  mask: true,
};

export default {
  show(content, config) {
    return render({ content, ...defaultConfig, ...config });
  },

  success(content, config) {
    const cfg = {
      icon: 'success',
    };
    return render({ content, ...defaultConfig, ...cfg, ...config });
  },

  fail(content, config) {
    const cfg = {
      icon: 'fail',
    };
    return render({ content, ...defaultConfig, ...cfg, ...config });
  },

  loading(content, config) {
    const cfg = {
      icon: 'loading',
      iconSpin: true,
      duration: 0,
    };
    return render({ content, ...defaultConfig, ...cfg, ...config });
  },

  hide() {
    toastHandle && toastHandle.close();
  },

  config(config) {
    defaultConfig = { ...defaultConfig, ...config };
  },
};
