import React, { Component } from 'react';
import toast from './components/toast';
import customToast from './components/custom-toast';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maskable: true,
    }
  }

  show = () => {
    toast.show('message');
  }

  success = () => {
    toast.success('success');
  }

  fail = () => {
    toast.fail('fail');
  }

  loading = () => {
    toast.loading('loading');
  }

  hide = () => {
    toast.hide();
  }

  changeMask = ({target}) => {
    toast.config({
      mask: target.checked
    })
    this.setState({
      maskable: target.checked,
    })
  }

  customLoading = () => {
    customToast.loading();
  }

  customShow = () => {
    customToast.show('自定义样式');
  }

  render() {
    const { maskable } = this.state;
    return (
      <div>
        <div className="top">
          <label><input type="checkbox" onChange={this.changeMask} checked={maskable} />是否需要mask</label>
        </div>
        <button onClick={this.show}>toast.show()</button>
        <button onClick={this.success}>toast.success()</button>
        <button onClick={this.fail}>toast.fail()</button>
        <button onClick={this.loading}>toast.loading()</button>
        <button onClick={this.hide}>toast.hide()</button>
        <button onClick={this.customLoading}>customToast.loading()</button>
        <button onClick={this.customShow}>customToast.show()</button>
      </div>
    );
  }
}
