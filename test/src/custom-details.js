const template = document.getElementById("custom-details").content;
class CustomDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.cloneNode(true))
        this.shadowRoot.innerHTML +=
            `<style>
            :host{   
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                padding: 15px;
                margin: 5px 0px;
                background: #333;
                border: solid 2px #eee;
                border-radius: 5px;
                color: #eee;
                font-family: QuickSand;
            }
        </style>`
    }

    connectedCallback() {
        this.$detaild = this.shadowRoot.querySelector('details')
        this.addEventListener('click', (ev) => ev.preventDefault())
        this.addEventListener('mouseenter', () => this.$detaild.open = true)
        this.addEventListener('mouseleave', () => this.$detaild.open = false)
        window.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') this.$detaild.open = false })
    }
    
    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('custom-details', CustomDetails);