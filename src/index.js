// @flow
import axios from 'axios';
import _ from 'lodash';

type DynectAuth = {
  customer_name: string,
  user_name: string,
  password:string,
};

let token:?string = null;

const maxRedirects = 999999;
const apiUrl = 'https://api.dynect.net/REST';

let loginData = {};

export function init(credentials:DynectAuth): void {
  loginData = credentials;
}

export function getCurrentToken() {
  return token;
}

export async function login(): Promise<any> {
  return new Promise((resolve, reject) => {   
    return request('/Session', 'POST', loginData).then((response) => {
      if(response.data && response.data.data && response.data.data.token) {
        token = response.data.data.token;
        return resolve(true);
      }
      return reject(new Error('Token was not recieved on request.'));
    }).catch((err) => {
      return reject(err);
    });
  });
}

export async function getZones(): Promise<any> {
  return new Promise((resolve, reject) => {   
    return request('/Zone', 'GET', null).then((response) => {
      if(response.data && response.data.data) {        
        return resolve(response.data.data);
      }
      return reject(new Error('Could not get zones.'));
    }).catch((err) => {
      return reject(err);
    });
  }); 
}

export async function getZone(zonePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return request(zonePath, 'GET', null).then((response) => {
      if(response.data && response.data.data) {        
        return resolve(response.data.data);
      }
      return reject(new Error('Could not get zones.'));
    }).catch((err) => {
      return reject(err);
    });
  });
}

export async function request(path: string, method:string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {

    const url = `${apiUrl}${path.replace("/REST", "")}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      _.set(headers, 'Auth-Token', token);
    }
    const request = {url, method, data, headers, maxRedirects};
    return axios(_.omit(request, _.isNil)).then((response) => {
      return resolve(response);
    }).catch((err) => {
      return reject(err);
    });
  });
}
