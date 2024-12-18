import { Component } from "../core/component.js";

function template(count) {
    return  `<div class="statistics">
                <h2>Статистика</h2>
                <div class="stats-block">
                    <p>Всего книг: <span id="total-books">${count}</span></p>
                </div>
            </div>`;
}

export default class StatisticsComponent extends Component {
    #count = 0;

    constructor({ container, count }) {
        super({ container });
        this.#count = count;
        this.render();
    }

    getTemplate() {
        return template(this.#count);
    }
}