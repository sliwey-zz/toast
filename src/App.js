import React, { Component } from 'react';
import Toast from './components/toast';
import CustomToast from './components/custom-toast';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maskable: true,
    }
  }

  show = () => {
    Toast.show('message');
  }

  success = () => {
    Toast.success('success');
  }

  fail = () => {
    Toast.fail('fail');
  }

  loading = () => {
    Toast.loading('loading');
  }

  hide = () => {
    Toast.hide();
  }

  changeMask = ({target}) => {
    Toast.config({
      mask: target.checked
    })
    this.setState({
      maskable: target.checked,
    })
  }

  customLoading = () => {
    CustomToast.loading();
  }

  customShow = () => {
    CustomToast.show('自定义样式');
  }

  render() {
    const { maskable } = this.state;
    return (
      <div>
        <div className="top">
          <label><input type="checkbox" onChange={this.changeMask} checked={maskable} />是否需要mask</label>
        </div>
        <button onClick={this.show}>Toast.show()</button>
        <button onClick={this.success}>Toast.success()</button>
        <button onClick={this.fail}>Toast.fail()</button>
        <button onClick={this.loading}>Toast.loading()</button>
        <button onClick={this.hide}>Toast.hide()</button>
        <button onClick={this.customLoading}>CustomToast.loading()</button>
        <button onClick={this.customShow}>CustomToast.show()</button>
      </div>
    );
  }
}
