class Review {

    static all = []

    constructor(id, city_visited, date_visited, experience) {
        this.id = id
        this.city_visited = city_visited
        this.date_visited = date_visited
        this.experience = experience
        Review.all.push(this)

    }
}
