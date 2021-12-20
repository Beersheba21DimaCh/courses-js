function getPromise(resolvedValue,timeOut, rejectedError) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(rejectedError){
                reject(rejectedError);
            } else {
                resolve(resolvedValue);
            }
        }, timeOut);
    })
}

class CoursesArray {
    #courses;
    constructor() {
        this.#courses = []
    }
    add(course) {
        if(this.#getIndex(course.id) >= 0) {
            return getPromise(undefined, 500, `course with id ${course.id} already exists` )
        }
        this.#courses.push(course);
        return getPromise(course, 500);
    }
    
    remove(id) {
        const index = this.#getIndex(id);
        if(index < 0) {
            return getPromise(undefined, 500, `course with id ${course.id} does not exists` )
        }
        return getPromise(this.#courses.splice(index, 1)[0], 1000);
    }
    
    get(id) {
        if(id != undefined){
            const course = this.#courses.find(c => c.id == id);
            return course ? getPromise(course, 100) : 
            getPromise(undefined, 100, `course with id ${id} does not exists`)
        }
        return getPromise([...this.#courses], 2000);
    }
    
    update(id, newCourse) {
        const index = this.#getIndex(id);
        if(index < 0){
            return getPromise(undefined, 500, `course with id ${id} does not exists` )
        }
        const res = this.#courses[index];
        this.#courses[index] = newCourse;
        return getPromise(newCourse, 1500);
    }
    
    exists(id) {
        return getPromise(this.#getIndex(id) >= 0, 100) ;
    }

    #getIndex(id) {
        let index = this.#courses.findIndex((e) => e.id == id);
        return index;
    }


}

export default CoursesArray;