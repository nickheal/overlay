import $ from './libs/jquery.js';

function scriptPresent() {
    return new Promise(resolve => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {instruction: 'identify'}, response => {
                    if (response) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        });
    });
};

$(document).ready(() => {
    scriptPresent().then(val => {
        if (val === false) {
            chrome.tabs.executeScript(null, {file: './pageScript.js'});
            chrome.tabs.insertCSS(null, {file: './pageCss.css'});
            window.close();
        } else {
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                for (let tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {instruction: 'toggle'}, response => {
                        window.close();
                    });
                }
            });
        }
    });
});