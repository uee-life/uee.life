import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import swal from 'sweetalert'

function toast ({title, message, type, timeout, cb}) {
    if (type  === VueNotifications.types.warn) type = 'warning'
    return swal(title, message, type)
}

const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}

Vue.use(VueNotifications, options)