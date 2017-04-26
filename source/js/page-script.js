import Dom from './pageScript/dom.js';

const d = new Dom();

const $img = $('<img src="https://placebear.com/300/300">');
$img.css({
    position: 'absolute',
    top: 0,
    left: '50%',
    zIndex: 999999999,
    transform: 'translateX(-50%)',
    opacity: .5,
    pointerEvents: 'none'
});

$('body').append($img);