import axios from 'axios'
import user from '../store/user'
const baseuri = 'http://localhost:3001/'
const offset = 50000
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
    get = function (url) {
        return new Promise(function (resolve, reject) {
            const storage = JSON.parse(localStorage.getItem(url))
            const timestamp = localStorage.getItem(url + '_timestamp')

            if ((storage || !timestamp) && (Date.now() < timestamp)) {
                resolve(storage)
            }
            else {
                http.get(url).then((response) => {
                    localStorage.setItem(url, JSON.stringify(response.data))
                    localStorage.setItem(url + '_timestamp', Date.now() + offset)
                    resolve(response.data)
                }, (err) => {
                    throwError(err, url)
                    reject(err, url)
                })
            }
        })
    },
    post = function (url, data) {
        return new Promise(function (resolve, reject) {
            http.post(url, data).then((response) => {
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
    remove,
    clear,
    throwError
}
