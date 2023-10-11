const css = await fetch('./src/style.css').then((response) => response.text())
const task_template = document.getElementById("list_item").content;
let id = 0

class MyTask extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML += `<style>${css}</style>`
        this.shadowRoot.appendChild(task_template.cloneNode(true))
        this.toSave = {done: false}
    }

    connectedCallback() {
        window.localStorage.setItem('maxId', id)
        id++        
        this.$check = this.shadowRoot.querySelector('.item_check')
        this.$name = this.shadowRoot.querySelector('.item_name')
        this.$edit_btn = this.shadowRoot.querySelector('.edit')
        this.$delete_btn = this.shadowRoot.querySelector('.delete')
        this.$container = this.shadowRoot.querySelector('.todo_container')
        this.setEventListener()
    }

    disconnectedCallback() {
        //implementation
    }

    static get observedAttributes(){
        return ['name']
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal
        this.shadowRoot.querySelector('.item_name').textContent = this.name
        this.toSave.name = this.name
        this.id = id
    }

    setEventListener(){
        this.$edit_btn.addEventListener('click', () => {
            this.$name.setAttribute('contenteditable', true)
            this.$name.focus()
        })
        this.$name.addEventListener('focusout', () => {
            this.$name.setAttribute('contenteditable', false)
            this.toSave.name = this.$name.value
            console.log(this.$name)
            this.setAttribute('name', this.$name.value)
        })
        this.$delete_btn.addEventListener('click', () => {
            this.remove()
        })
        this.$check.addEventListener('change', () => {
            let isCheck = this.$check.checked
            this.toSave.done = isCheck
            this.$container.classList.add(isCheck)
        })
    }

    saveToStorage(){

    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('my-task', MyTask);

class MyList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML +=        
        `<style>${css}</style>
        <div class="todo_container f-column gap">
            <form class="f-between gap">
                <input type="text" name="task_title"/>
                <input type="submit" value="Ajouter une tache" class="cta"/>
            </form>
            <div class="f-column gap item_wrapper">
                
            </div>
            <button class="cta warn full delete_complete">Suprimer tache terminé</button>
        </div>`
    }

    connectedCallback() {
        this.$form = this.shadowRoot.querySelector('form')
        this.$text = this.shadowRoot.querySelector('input[name="task_title"]')
        this.$add = this.shadowRoot.querySelector('.add')
        this.$delete = this.shadowRoot.querySelector('.delete')
        this.$list = this.shadowRoot.querySelector('.item_wrapper')
        this.$form.addEventListener('submit', this.createTask.bind(this))
    }

    createTask(event){
        event.preventDefault()
        const name = this.$text.value
        let newTaks = document.createElement('my-task')
        this.$list.appendChild(newTaks)
        newTaks.setAttribute('name', name)
    }

    disconnectedCallback() {
        //*
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //*
    }

    adoptedCallback() {
        //*
    }

}

window.customElements.define('my-list', MyList);