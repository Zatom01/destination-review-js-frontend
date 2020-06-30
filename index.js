
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

function loadFormListener() {

    const postForm = document.getElementById("blog-form")
    postForm.addEventListener("submit", function (event) {
        event.preventDefault()
        const postResult = getInfo(event)
        const htmlPost = postHTML(postResult)
        attachPost(htmlPost)
        clearForm()
    })
}
