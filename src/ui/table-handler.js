
// function fillTableHeader(headerElement, keys, sortFn){
//     headerElement.innerHTML = getColumns(keys, sortFn);
// }

// function getColumns(keys, sortFnName){
//     return keys.map(key => {
//         return !sortFnName ? `<th>${key}</th>` :
//          `<th style="cursor: pointer" onclick="${sortFnName}('${key}')">${key}</th>`
//     }).join('');
// }

// function getColumns(keys, sortFnName) {
//     return keys.map(key => {
//         return !sortFnName ? `<th>${key}</th>` :
//             `<th style="cursor: pointer">${key}</th>`
//     }).join('');
// }

export default class TableHandler {
    #keys //fields of being displayed object
    #bodyElement
    #rmFnName;
    constructor(idHeader, idBody, keys, sortFn, rmFnName) {
        this.#keys = keys;
        if(rmFnName){
            this.#rmFnName = rmFnName;
        }

        const headerElement = document.getElementById(idHeader);
        if(!headerElement) {
            throw "Wrong Table Header"
        }
        this.#bodyElement = document.getElementById(idBody);
        if(!this.#bodyElement) {
            throw "Wrong Table Body Placeholder"
        }
        this.#fillTableHeader(headerElement, keys, sortFn);

        if(sortFn){
            const columsEl = document.querySelectorAll(`#${idHeader} th`);
            columsEl.forEach(c => c.addEventListener(`click`, sortFn.bind(this, c.textContent)));
        }
    }

    clear() {
        this.#bodyElement.innerHTML = '';
    }
    addRow(obj, id){
            this.#bodyElement.innerHTML += `<tr id="${id}">${this.#getRecordData(obj)}</tr>`;
    }

    removeRow(id) { 
        document.getElementById(id).remove(); 
    }

    #getRecordData(obj) { 
        return this.#keys.map(k => `<td>${obj[k].constructor.name === "Date" ?  
            obj[k].toISOString().substr(0,10) : obj[k]}</td>`) 
            .join('') 
            .concat(this.#rmFnName ? `<td style="cursor: pointer" onclick="${this.#rmFnName}('${obj.id}')" ><i class="bi bi-trash"></i></td>` : ""); 
    }

    #fillTableHeader(headerElement, keys, sortFun) { 
        headerElement.innerHTML = this.#getColumns(keys, sortFun); 
    } 
     
    #getColumns(keys, sortFun) { 
        return keys.map(key => { 
            return !sortFun ? `<th>${key}</th>`  
                : `<th style="cursor: pointer">${key}</th>`; 
        }).join('').concat(this.#rmFnName ? '<th></th>' : ''); 
    }

    static confirm(message){
        return window.confirm(message);
    }
}

