import $ from '../libs/jquery.js';

export default class Dom {
    constructor() {
        this.draw();
        this.attachEvents();

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.instruction === 'identify') {
                sendResponse({reply: 'here!'});
            } else if (request.instruction === 'toggle') {
                if (this.$domElement) {
                    this.$domElement.toggleClass('is-nho-active');
                }
            }
        });
    }

    draw() {
        this.$domElement = $(`
            <div class="nho-global-container is-nho-active">
                <div class="nho-container">
                    <div class="js-nho-drop-zone nho-drop-zone"></div>
                    <input class="js-nho-opacity-slider" type="range">
                </div>
                <img class="js-nho-overlay-image nho-overlay-image" src="">
            </div>
        `);
        $('body').append(this.$domElement);
    }

    attachEvents() {
        const $dropZone = this.$domElement.find('.js-nho-drop-zone'),
            $overlayImage = this.$domElement.find('.js-nho-overlay-image'),
            $opacitySlider = this.$domElement.find('.js-nho-opacity-slider');

        $dropZone.on('dragover', e => {
            e.preventDefault();
            e.stopPropagation();
        });
        $dropZone.on('drop', e => {
            e.preventDefault();
            e.stopPropagation();

            const files = e.originalEvent.dataTransfer.files;

            if (files[0]) {
                const file = files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => {
                    $dropZone.css({
                        backgroundImage: `url(${e.target.result})`
                    });
                    $overlayImage.attr('src', e.target.result);
                }
            }
        });

        $opacitySlider.on('input', e => {
            const $this = $(e.currentTarget);
            $overlayImage.css({
                opacity: $this.val() / 100
            });
        });
    }
}