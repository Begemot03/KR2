import { Component } from "../core/component.js";

function template() {
    return  `<div class="books-list">
                <h2>Книги в библиотеке</h2>
                <div id="books-container"></div>
            </div>`;
}

export default class BookListComponent extends Component {
    constructor({ container, rootSelector = "#books-container" }) {
        super({ container, rootSelector });
        this.render();
    }

    getTemplate() {
        return template();
    }
}