import BookModel from "../model/Model.js";
import BookListComponent from "../view/BookListComponent.js";
import BookListItemComponent from "../view/BookListItemComponent.js";
import AddBookFormComponent from "../view/AddBookFormComponent.js";
import BookFiltersComponent from "../view/BookFiltersComponent.js";
import StatisticsComponent from "../view/StatisticsComponent.js";

export default class Presenter {
	#container = null;
	#bookList = null;
	#bookModel = new BookModel();
	#filters = {
		genre: "",
		search: "",
	};

	constructor({ container }) {
		this.#container = container;
		this.#bookModel.subscribe(() => this.render());
		this.render();
	}

	render() {
		this.#clearApp();
		this.#renderStatistic();
		this.#renderAddNewBook();
		this.#renderFilters();
		this.#renderList();
		this.#renderBookItems();
	}

	#renderStatistic() {
		const count = this.#bookModel.getBooks(this.#filters).length;
		new StatisticsComponent({
			container: this.#container,
			count: count,
		});
	}

	#renderList() {
		this.#bookList = new BookListComponent({
			container: this.#container,
		});
	}

	#renderBookItems() {
		this.#bookModel.getBooks(this.#filters).forEach((book) => {
			this.#renderBookItem(book);
		});
	}

	#renderBookItem(book) {
		new BookListItemComponent({
			container: this.#bookList.getRoot(),
			book,
			deleteCb: () => this.#bookModel.removeBook(book.id),
		});
	}

	#renderAddNewBook() {
		new AddBookFormComponent({
			container: this.#container,
			addItemCb: (e) => this.addBookHandler(e),
		});
	}

	#renderFilters() {
		new BookFiltersComponent({
			container: this.#container,
			addFilter: (filter) => this.#addFilter(filter),
		});
	}

	#clearApp() {
		if (this.#container) {
			this.#container.innerHTML = "";
		}
	}

	#addFilter(filter) {
		this.#filters = { ...this.#filters, ...filter };
		this.#clearList();
		this.#renderBookItems();
	}

	#clearList() {
		if (this.#bookList) {
			this.#bookList.getRoot().innerHTML = "";
		}
	}

	addBookHandler(e) {
		const form = e.currentTarget;

		const book = {
			title: form.querySelector("#title").value.trim(),
			author: form.querySelector("#author").value.trim(),
			year: parseInt(form.querySelector("#year").value.trim()),
			genre: form.querySelector("#genre").value,
			status: form.querySelector("#status").value,
		};

		if (book.title === "") return;
		form.reset();
		this.#bookModel.addBook(book);
	}
}
