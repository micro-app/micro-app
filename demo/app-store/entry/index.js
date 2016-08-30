import app from './app.vue';
import Vue from 'vue';
import VueTouch from 'vue-touch';

if (navigator.standalone && location.hash.length) {
} else {
    Vue.use(VueTouch)
    new Vue({
        el : 'body',
        components: {
            app,
        },
    });
}
