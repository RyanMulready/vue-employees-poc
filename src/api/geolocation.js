import store from '../store'

const location = {
    install (poptions) {
        const defaults = {
        }
        var options = Object.assign({}, defaults, poptions)
        requestLocation(options)
    }
}

function requestLocation (options) {
    navigator.geolocation.watchPosition(successLocation, errorLocation, options)
}

function successLocation (location) {
    store.dispatch('user/updateLocationData', location)
}

function errorLocation (error) {
    console.log(error)
}

export default location
