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
            <img src="${this.image}" width ="100" /><br>
            <a href= "/countries/${this.id}"><h2 class="header">${this.name}</h2></a>
            <p>${this.continent}</p>
            <button class="delete" data-id="${this.id}"> DELETE ? </button><br><br>


        `

    }

    reviewHTML() {
        return `
            <br><br>
            <h1 class="centerClass">Here are ${this.name}'s city reviews</h1>
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
            if (e.target.className.includes("header")) { this.showCountry(e) }

        })

    }

    showCountry(e) {
        e.preventDefault()
        const countryContainer = document.getElementById('country-container')

        countryContainer.innerHTML = ""

        const reviewTitle = document.createElement("div")

        reviewTitle.classList.add("review-title-card")

        reviewTitle.innerHTML += this.reviewHTML()

        countryContainer.appendChild(reviewTitle)


        API.postReviews(this.id)

    }


    static renderReview(id, city_visited, date_visited, experience) {

        const countryContainer = document.getElementById('country-container')
        const reviewCard = document.createElement("div")
        reviewCard.classList.add("review-card")

        const newHTML = `

            <p>REVIEW ID: ${id}</p>
            <p>CITY VISITED: ${city_visited}</p>
            <p>DATE VISITED: ${date_visited}</p>
            <p>EXPERIENCE: ${experience}</p>
            <button class="update" data-id="${id}"> UPDATE ? </button><br><br>
            <button class="delete" data-id="${id}"> DELETE ? </button>

        `

        reviewCard.innerHTML += newHTML
        countryContainer.appendChild(reviewCard)




    }


















}
