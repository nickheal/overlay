import $ from '../libs/jquery.js';

export default class Dom {
    constructor() {
        this.draw();
        this.attachEvents();
    }

    draw() {
        this.$domElement = $(`
            <div class="nho-container">
                <div class="js-nho-drop-zone nho-drop-zone"></div>
                <input type="range">
            </div>
        `);
        $('body').append(this.$domElement);
    }

    attachEvents() {

    }
}