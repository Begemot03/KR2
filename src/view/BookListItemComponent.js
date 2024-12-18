import { Component } from "../core/component.js";

function template(book) {
	return `<div class="card ${
		book.status === "AVAILABLE"
			? "available"
			: book.status === "BORROWED"
			? "borrowed"
			: "reserved"
	}">
                <div class="card-title">
                    <strong>${book.title}</strong> <br> 
                    <span>Автор: ${book.author}</span> <br>
                    <span>Год: ${book.year}</span> <br>
                    <span>Жанр: ${book.genre}</span>
					<span>Статус: <strong>${
						book.status === "AVAILABLE"
							? "Доступна"
							: book.status === "BORROWED"
							? "Взята"
							: "Зарезервирована"
					}</strong></span>
                </div>
                <button class="card-delete">Удалить</button>
            </div>`;
}

export default class BookListItemComponent extends Component {
	constructor({ container, book, deleteCb }) {
		super({ container });
		this.book = book;
		this.deleteCb = deleteCb;
		this.render();
		this.onMount();
	}

	onMount() {
		this.element.querySelector(".card-delete").addEventListener("click", () => {
			this.deleteCb();
		});
	}

	getTemplate() {
		return template(this.book);
	}
}
