fetch("http://localhost:3000/countries")
    .then(resp => resp.json())
    .then(countries => {
        countries.forEach(country => {
            const { id, name, continent, image } = country //mass assignment
            new Country(id, name, continent)
        })
    })
