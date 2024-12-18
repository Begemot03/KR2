import { Component } from "../core/component.js";

function template() {
    return `<div class="book-form">
                <h2>Добавление книги</h2>
                <form id="book-form">
                    <div>
                        <label for="title">Название книги:</label>
                        <input type="text" id="title" placeholder="Название книги" />
                        <small id="title-error" class="error-message-small" style="display: none;">Пожалуйста, укажите название книги</small>
                    </div>
                    <div>
                        <label for="author">Автор:</label>
                        <input type="text" id="author" placeholder="Автор" />
                        <small id="author-error" class="error-message-small" style="display: none;">Пожалуйста, укажите автора</small>
                    </div>
                    <div>
                        <label for="year">Год издания:</label>
                        <input type="number" id="year" placeholder="Год издания" min="1000" max="2024" />
                        <small id="year-error" class="error-message-small" style="display: none;">Пожалуйста, укажите год издания</small>
                    </div>
                    <div>
                        <label for="genre">Жанр:</label>
                        <select id="genre">
                            <option value="">Выберите жанр</option>
                            <option value="FICTION">Художественная литература</option>
                            <option value="SCIENCE">Научная литература</option>
                            <option value="HISTORY">Историческая литература</option>
                            <option value="PROGRAMMING">Программирование</option>
                        </select>
                        <small id="genre-error" class="error-message-small" style="display: none;">Пожалуйста, выберите жанр</small>
                    </div>
                    <div>
                        <label for="status">Статус книги:</label>
                        <select id="status">
                            <option value="">Выберите статус</option>
                            <option value="AVAILABLE">Доступна</option>
                            <option value="BORROWED">Выдана</option>
                            <option value="RESERVED">Зарезервирована</option>
                        </select>
                        <small id="status-error" class="error-message-small" style="display: none;">Пожалуйста, выберите статус</small>
                    </div>
                    <button type="submit">Добавить книгу</button>
                </form>
        </div>`;
}

export default class AddBookFormComponent extends Component {
    constructor({ container, addItemCb }) {
        super({ container });
        this.addItemCb = addItemCb;
        this.render();
        this.onMount();
    }

    onMount() {
        const form = this.element.querySelector("#book-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();


            const title = form.querySelector("#title").value.trim();
            const author = form.querySelector("#author").value.trim();
            const year = form.querySelector("#year").value.trim();
            const genre = form.querySelector("#genre").value;
            const status = form.querySelector("#status").value;

            let valid = true;

            if (!title) {
                this.showErrorMessage("title-error", "Пожалуйста, укажите название книги");
                valid = false;
            } else {
                this.hideErrorMessages("title-error");
            }
            if (!author) {
                this.showErrorMessage("author-error", "Пожалуйста, укажите автора");
                valid = false;
            } else {
                this.hideErrorMessages("author-error");
            }
            if (!year) {
                this.showErrorMessage("year-error", "Пожалуйста, укажите год издания");
                valid = false;
            } else {
                this.hideErrorMessages("year-error");
            }
            if (!genre) {
                this.showErrorMessage("genre-error", "Пожалуйста, выберите жанр");
                valid = false;
            } else {
                this.hideErrorMessages("genre-error");
            }
            if (!status) {
                this.showErrorMessage("status-error", "Пожалуйста, выберите статус");
                valid = false;
            } else {
                this.hideErrorMessages("status-error");
            }

            if (valid) {
                this.addItemCb(e);
            }
        });
    }

    getTemplate() {
        return template();
    }

    showErrorMessage(field, message) {
        const errorMessage = this.element.querySelector(`#${field}`);
        errorMessage.style.display = "block";
        errorMessage.textContent = message;
    }

    hideErrorMessages(field) {
        const errorMessage = this.element.querySelector(`#${field}`);
        errorMessage.style.display = "none";
    }
}
