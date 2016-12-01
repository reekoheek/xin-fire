import xin from 'xin';
import checkCordovaAsync from '../../lib/check-cordova';

class FireMessaging extends xin.Component {
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
      if (await checkCordovaAsync() === false) {
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

xin.define('fire-messaging', FireMessaging);

export default FireMessaging;
