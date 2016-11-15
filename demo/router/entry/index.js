import app from './app.vue';
import Vue from 'vue';
import VueTouch from 'vue-touch';

if (navigator.standalone && location.hash.length) {
    location.replace(decodeURIComponent(location.hash.substring(1)));
} else {
    Vue.use(VueTouch)
    new Vue({
        el : 'body',
        components: {
            app,
        },
    });
}
