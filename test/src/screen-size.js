class ScreenSize extends HTMLElement {
    constructor() {
        super();
        this.unit = 'px'
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = `
        <style>
        :host{
        display: block;
        text-align:center;
        padding: 15px;
        margin: 5px 0px;
        background: #333;
        border: solid 2px #eee;
        border-radius: 5px;
        color: #eee;
        font-family: QuickSand;   
        }   
        </style>
            <span class='value'></span> 
            <span class='unit'></span>
            <button>switch</button>
        ` 
        this.$value = this.shadowRoot.querySelector('.value')
        this.$unit = this.shadowRoot.querySelector('.unit')
        this.$button = this.shadowRoot.querySelector('button')
        this.rem = Number(getComputedStyle(document.body).fontSize.match(/\d+/g)[0])
        this.render(this.getViewport())
        this.setEventListener()
    }

    connectedCallback() {
        //implementation
    }

    disconnectedCallback() {
        //implementation
    }

    static get observedAttributes() {
        return ['unit']
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal
    }

    adoptedCallback() {
        //implementation
    }

    render(value) {
        this.$value.innerHTML = value
        this.$unit.innerHTML = this.unit
    }

    update() {
        this.$value.innerHTML = this.getViewport()
    }

    getViewport() {
        let vw = window.innerWidth
        if(this.unit === 'rem')
          vw = vw/this.rem  
        return vw
    }

    setEventListener() {
        window.addEventListener('resize', this.update.bind(this))
        this.$button.addEventListener('click', () => {
            this.unit = this.unit === 'px' ? 'rem' : 'px';
            this.$unit.innerHTML = this.unit
            this.update()
        })
    }
}

window.customElements.define('screen-size', ScreenSize);

