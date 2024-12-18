export class Component {
    constructor({ container, rootSelector = null }) {
        this.container = container;
        this.rootSelector = rootSelector;
        this.root = null;
    }

    getTemplate() {}

    render() {
        this.element = htmlToNode(this.getTemplate());
        this.container.appendChild(this.element);
    }

    onMount() {}

    getRoot() {
        if(!this.rootSelector) return this.rootSelector;

        if(!this.root) this.root = this.element.querySelector(this.rootSelector);

        return this.root;
    }
}

function htmlToNode(html) {
    const node = document.createElement("template");
    node.innerHTML = html;

    return node.content.firstChild;
}