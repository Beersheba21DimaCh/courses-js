function createObject(obj, element) {
    switch (element.type) {
        case "radio": if (element.checked) {
            obj[element.name] = element.value;
            break;
        }
        case "checkbox": if (!obj[element.name]) {
            obj[element.name] = [];
        }
            if (element.checked) {
                obj[element.name].push(element.value);
            }
            break;
        default: obj[element.name] = element.value;
    }
    return obj;
}

export default class FormHandler {
    #formELement;
    #alertElement;
    #inputElements;
    constructor(idForm, idAlert) {
        this.#formELement = document.getElementById(idForm);
        if (!this.#formELement) {
            throw new Error(`wrong form id ${idForm}`);
        }
        if (idAlert) {
            this.#alertElement = document.getElementById(idAlert);
        }
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`);
        if (!this.#inputElements || this.#inputElements.length == 0) {
            throw new Error("Wrong form content");
        }
        this.#inputElements = Array.from(this.#inputElements); //convertion to array from NodeList
    }

    addHandler(handlerFn) {
        this.#formELement.addEventListener(`submit`, this.#onSubmit.bind(this, handlerFn));
    }
    static fillOptions(idSelect, options){
        const selectElement = document.getElementById(idSelect);
        if(!selectElement){
            throw new Error(`wrong select id ${idSelect}`);
        }
        selectElement.innerHTML += getOptions(options);
    } 
    #onSubmit(handlerFn, event){
        event.preventDefault();
        const obj = this.#inputElements.reduce(createObject, {});
        try {
            handlerFn(obj);
            this.#formELement.reset();
        } catch (error) {

            this.#alertElement.innerHTML += 
            `<div  class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> ${error}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        }
    }
}

/*

*/

function getOptions(options){
    return options.map(o => `<option value="${o}">${o}</option>`).join(``);
}