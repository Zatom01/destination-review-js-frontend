
document.addEventListener("DOMContentLoaded", function () {
    loadPosts()
    loadFormListener()
})




function addPostsToPage(reviews) {
    reviews.forEach(function (review) {
        attachPost(postHTML(review))

    })


}

function loadPosts() {
    fetch("http://localhost:3000/reviews")
        .then(resp => resp.json())
        .then(data => {
            addPostsToPage(data)
        })
}

function getInfo(event) {
    return {
        city_visited: event.target.querySelector("#city_visited").value,
        date_visited: event.target.querySelector("#date_visited").value,
        experience: event.target.querySelector("#experience").value
    }

}


function postHTML(postResult) {
    return `
            <div class="card-content">
                <span class="card-title">${postResult.city_visited}</span>
                <p>${postResult.date_visited}</p>
                <p>${postResult.experience}</p>
                <button class="edit">Edit Review</button>
                <button class="delete">Delete Review</button>
            </div>
            <br><br>

    `

}

const clearForm = () => {
    document.getElementById("city_visited").value = " "
    document.getElementById("date_visited").value = " "
    document.getElementById("experience").value = " "
}


const attachPost = function (post) {
    document.querySelector(".review-card").innerHTML += post
}


function scrapeCountriesAndPost(data) {
    for (const country of data) {
        const name = country.name
        const id = country.id
        const post = `
            <br>
            <div class="country-card">
                <h3> ${name}</h3>
                <p>${name}'s id: ${id}</p>
                <p>${name}'s reviews</p>
            </div>
            <br>
        `
        document.querySelector("#countries-list").innerHTML += post


    }
}


function loadCountries() {
    fetch("http://localhost:3000/countries")
        .then(resp => resp.json())
        .then(data => scrapeCountriesAndPost(data))

}

function loadFormListener() {

    loadCountries()

    const postForm = document.getElementById("blog-form")
    postForm.addEventListener("submit", function (event) {
        event.preventDefault()
        const postResult = getInfo(event)

        fetch("http://localhost:3000/reviews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postResult)
        })
            .then(resp => resp.json())
            .then(console.log)



        const htmlPost = postHTML(postResult)
        attachPost(htmlPost)
        clearForm()
    })
}
