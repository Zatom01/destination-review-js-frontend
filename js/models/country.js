class Country {

    static all = []

    constructor(id, name, continent, image) {

        this.id = id
        this.name = name
        this.continent = continent
        this.image = image
        this.renderCountry()

    }

    countryHTML() {
        return `
            <img src=${this.image}" width ="100" /><br>
            <a href= "/countries/${this.id}><h2 class="header">${this.name}</h2></a>
            <p>${this.continent}</p>
            <button class="delete" data-id="${this.id}"> DELETE ? </button><br><br>

        `

    }

    deleteCountry(e) {
        const id = parseInt(e.target.dataset.id)
        fetch(`http://localhost:3000/countries/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                document.getElementById("country-container").removeChild(document.getElementById(id))
            })

    }



    renderCountry() {
        const countryContainer = document.getElementById('country-container')
        const countryCard = document.createElement("div")
        countryCard.classList.add('country-card')
        countryCard.id = this.id
        countryCard.innerHTML += this.countryHTML()
        countryContainer.appendChild(countryCard)
        countryCard.addEventListener("click", e => {
            if (e.target.className.includes("delete")) { this.deleteCountry(e) }

        })
    }

















}
