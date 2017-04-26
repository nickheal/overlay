import $ from './libs/jquery.js';

$(document).ready(() => {
    $('#js-activate-button').on('click', e => {
        const active = localStorage.getItem('overlay-active');
        if (active === 'false') {
            chrome.tabs.executeScript(null, {file: './pageScript.js'});
            chrome.tabs.insertCSS(null, {file: './pageCss.css'});
            $(e.currentTarget).remove();
            localStorage.setItem('overlay-active', true);
            window.close();
        }
    })
})

chrome.webNavigation.onCompleted.addListener((tabId, changeInfo, tab) => {
    localStorage.setItem('overlay-active', false);
});