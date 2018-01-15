import { Toast } from 'quasar'

var notificationsObject = {}
var notificationDelay = 0

const notifications = {
    install (options) {
        requestPermissions()
    },
    /*
        msg {
            name = unique title
            data: {
                notify = boolean true/false to show nofitication
                body =   DOMString to be displayed in notification
                type =   info/warning/error/success
                link =   clicking on notification will bring the user here
                icon =   icon to be displayed in the notification
                id =     ID of object created or updated
            }
        }
    */
    displayNotification (msg) {
        const defaults = {
            id: null,
            link: null,
            notify: true,
            type: 'info',
            body: '',
            icon: null
        }
        const mdata = msg.data
        msg.data = Object.assign({}, defaults, mdata)

        Notification.requestPermission(function (status) {
            notificationDelay = notificationDelay + 500
            if (status === 'granted') {
                setTimeout(function () { // Delay is required because some browsers prevent any notifications from showing if they appear to quickly
                    notificationsObject[msg.name] = new Notification(msg.name, {
                        body: msg.data.body,
                        requireInteraction: true // Most browsers will close this after awhile regardless of this setting
                    })

                    if (msg.data.link) {
                        notificationsObject[msg.name].onclick = function (event) {
                            event.preventDefault() // prevent the browser from focusing the Notification's tab if the user is on another tab
                            location.href = msg.data.link
                        }
                    }

                    notificationDelay = 500
                }, notificationDelay)
            }
            else {
                var button = {}

                if (msg.data.link) {
                    button = {
                        'label': 'View',
                        handler () {
                            location.href = msg.data.link
                        }
                    }
                }
                if (msg.data.type === 'info') {
                    Toast.create.info({
                        html: msg.data.body,
                        button
                    })
                }
                else if (msg.data.type === 'error') {
                    Toast.create.negative({
                        html: msg.data.body,
                        button
                    })
                }
                else if (msg.data.type === 'success') {
                    Toast.create.positive({
                        html: msg.data.body,
                        button
                    })
                }
                else if (msg.data.type === 'warning') {
                    Toast.create.warning({
                        html: msg.data.body,
                        button
                    })
                }
            }
        })
    }
}

function requestPermissions () {
    return Notification.requestPermission()
}

export default notifications
