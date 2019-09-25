import Vue from 'vue';
import moment from 'moment';
import numeral from 'numeral';


Vue.filter('day', function (value) {
    return moment(value).format('ddd MMM Do YY ');
})

Vue.filter('currency', function (value) {
    return numeral(value).format('$0,0.00');
})