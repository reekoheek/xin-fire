import { Component, define } from '@xinix/xin';
import isCordova from 'xin-cordova/lib/is-cordova';

class FireMessaging extends Component {
  get props () {
    return Object.assign({}, super.props, {
      token: {
        type: String,
        notify: true,
        value: '',
      },
    });
  }

  attached () {
    super.attached();

    return new Promise(async (resolve, reject) => {
      if (await isCordova() === false) {
        console.warn('fire-messaging only works on cordova for now\nThe token will be mocked');
        this.set('token', Math.random().toString(36).replace(/[^a-z]+/g, '') + '');
        return resolve();
      }

      window.FirebasePlugin.getToken(token => {
        this.set('token', token);
        resolve();
      }, err => {
        console.error('firebase gettoken error', err);
        reject(err);
      });
    });
  }
}

define('fire-messaging', FireMessaging);

export default FireMessaging;
