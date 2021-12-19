class CoursesArray {
    #courses;
    constructor() {
        this.#courses = []
    }
    add(course) {
        this.#courses.push(course);
    }
    
    remove(id) {
        this.#courses.splice(this.#getIndex(id), 1);
    }
    
    get(id) {
        return id != undefined ? this.#courses.find(c => c.id == id) : [...this.#courses];
    }
    
    update(id, newCourse) {
        this.#courses[this.#getIndex(id)] = newCourse;
    }
    
    exists(id) {
        return this.#getIndex(id) >= 0 ;
    }

    #getIndex(id) {
        let index = this.#courses.findIndex((e) => e.id == id);
        return index;
    }


}

export default CoursesArray;