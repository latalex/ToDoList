class currentTime extends HTMLElement {

    connectedCallback(){
        console.log('connected')
        this.render(this.getTime())
        this.$time = this.querySelector('.currentTime__time')
        this.setActualisation()
    }

    disconnectedCallback(){
        clearInterval(this.actualisation)
        console.log('disonnected')
    }

    static get observedAttributes(){
        return ['format']
    }

    attributeChangedCallback(attr, oldVal, newVal){
        this[attr] = newVal
    }

    render(time){
        this.innerHTML = `
        <div class='currentTime'>
            <p class='currentTime__title'>Heure ${this.format}</p>
            <time class='currentTime__time'>${time ?? 'error'}</time>
        </div>`
    }

    getTime(){
        let date
        if(this.format === "utc"){
            date = new Date().toUTCString()
        }else{
            date = new Date().toLocaleString()
        }        
        return date
    }

    setActualisation(){
        this.actualisation = setInterval(() => {
            this.$time.innerHTML = this.getTime()
        }, 1000);
    }
}

class CurrentTime_Clickable extends currentTime{
    connectedCallback() {
        super.connectedCallback()
        this.addEventListener('click', this.switchAttrFormat)
    }

    switchAttrFormat(){
        this.format === "utc"?
            this.setAttribute('format', 'locale'):
            this.setAttribute('format', 'utc');
        super.render(super.getTime())
        super.setActualisation()
    }

    adoptedCallback() {
        //implementation
    }

}


customElements.define('current-time', currentTime)
customElements.define('current-time-clickable', CurrentTime_Clickable);


