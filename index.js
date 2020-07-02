fetch("http://localhost:3000/countries")
    .then(resp => resp.json())
    .then(countries => {
        countries.forEach(country => {
            const { id, name, continent, image } = country //mass assignment
            new Country(id, name, continent)
        })
    })


document.getElementById("country-form").addEventListener("submit", addCountry)


function addCountry(e) {
    e.preventDefault()
    let data = {
        "name": e.target.name.value,
        "continent": e.target.continent.value,
        "image": e.target.img.value
    }

    fetch("http://localhost:3000/countries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(country => {
            const {
                id, name, continent, image
            } = country
            new Country(id, name, continent, image)
            document.getElementById('country-form').reset()

        })
}
