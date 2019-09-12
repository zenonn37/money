import Vue from 'vue';
import moment from 'moment';
import numeral from 'numeral';


Vue.filter('day', function (value) {
    return moment(value).format('dddd h:mm a');
})