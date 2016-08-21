import styles from './style.scss';
import $ from 'jquery';

$('.menu').click(function() {
    $(this).toggleClass('active');
});
