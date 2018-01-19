import axios from 'axios'
import user from '../store/user'
const baseuri = 'http://localhost:10001'
import notifications from '../api/notifications'

const http = axios.create({
    baseURL: baseuri,
    headers: {
        Authorization: user.state.token
    }
}),
    throwError = function (err, url) {
        const msg = {
            'name': 'NetworkError',
            'data': {
              'type': 'error',
              'notify': true,
              'body': err.message + '\n' + url
            }
        }
        notifications.displayNotification(msg)
    },
    throwSuccess = function (success, url) {
        const msg = {
            'name': 'NetworkSuccess',
            'data': {
              'type': 'error',
              'notify': true,
              'body': 'Server Responded With Success\n' + url
            }
        }
        notifications.displayNotification(msg)
    },
    get = function (url) {
        return new Promise(function (resolve, reject) {
            http.get(url).then((response) => {
                resolve(response.data)
            }, (err) => {
                throwError(err, url)
                reject(err, url)
            })
        })
    },
    post = function (url, data) {
        return new Promise(function (resolve, reject) {
            http.post(url, data).then((response) => {
                throwSuccess(url)
                resolve(response.data)
            }, (err) => {
                throwError(err, url)
                reject(err, url)
            })
        })
    },
    patch = function (url, data) {
        return new Promise(function (resolve, reject) {
            http.patch(url, data).then((response) => {
                throwSuccess(url)
                resolve(response.data)
            }, (err) => {
                throwError(err, url)
                reject(err, url)
            })
        })
    },
    remove = function (url, data) {
        return new Promise(function (resolve, reject) {
            http.delete(url, data).then((response) => {
                throwSuccess(url)
                resolve(response.data)
            }, (err) => {
                throwError(err, url)
                reject(err, url)
            })
        })
    },
    clear = function (url) {
        return new Promise(function (resolve, reject) {
            localStorage.removeItem(url)
            localStorage.removeItem(url)
            resolve()
        })
    }

export default {
    http,
    get,
    post,
    patch,
    remove,
    clear,
    throwError
}
