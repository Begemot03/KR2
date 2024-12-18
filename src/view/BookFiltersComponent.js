import { Component } from "../core/component.js";

function template() {
	return `<div class="filters">
                <h2>Фильтры</h2>
                <select id="genre-filter">
                    <option value="">Все жанры</option>
                    <option value="FICTION">Художественная литература</option>
                    <option value="SCIENCE">Научная литература</option>
                    <option value="HISTORY">Историческая литература</option>
                    <option value="PROGRAMMING">Программирование</option>
                </select>

                <input type="text" id="search-input" placeholder="Поиск по названию или автору">
            </div>`;
}

export default class BookFiltersComponent extends Component {
	constructor({ container, addFilter }) {
		super({ container });
		this.render();
		this.addFilter = addFilter;
		this.onMount();
	}

	onMount() {
		this.element
			.querySelector("#genre-filter")
			.addEventListener("change", (e) => {
				this.addFilter({ genre: e.target.value });
			});

		this.element
			.querySelector("#search-input")
			.addEventListener("input", (e) => {
				this.addFilter({ search: e.target.value.trim() });
			});
	}

	getTemplate() {
		return template();
	}
}
