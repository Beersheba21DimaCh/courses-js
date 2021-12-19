import _ from "lodash";
import { getRandomInteger } from "../util/random";

export default class Colledge {
    #coursesProvider;
    #courseDate;
    
    constructor(coursesProvider, courseDate) {
        this.#coursesProvider = coursesProvider;
        this.#courseDate = courseDate;
    }
    addCourse(course) {
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openDate = new Date(course.openDate);
        let error;
        if( (error = this.#validate(course)) != ''){
            throw new Error(error);
        }
        const id = this.#getId();
        course.id = id;
        this.#coursesProvider.add(course);
    }

    removeCourse(id) { 
        this.#coursesProvider.remove(id); 
    }

    #getId(){
        let rndId;
        do {
            rndId = getRandomInteger(this.#courseDate.minId, this.#courseDate.maxId);
        } while(this.#coursesProvider.exists(rndId));
        return rndId;
    }

    getAllCourses(){
        return this.#coursesProvider.get();
    }

    getElementsByHours(value){
        let interval = value.interval;
        let arr = this.#coursesProvider.get();
        let arrCnt =  _.countBy(arr, e => {   
           return Math.floor(e.hours/interval)*interval;
        });
        return this.#getInterval(arrCnt, interval)
    }

    getElementsByCost(value){
        let interval = value.interval;
        let arr = this.#coursesProvider.get();
        let arrCnt =  _.countBy(arr, e => {   
           return Math.floor(e.cost/interval)*interval;
        });
        return this.#getInterval(arrCnt, interval)
    }

    #getInterval(array, interval){
        let res = [];
        for (let key in array) {
            let minInterval = key;
            let maxInterval = +key + +interval - 1;
            let amount = array[key];
            res.push({minInterval:minInterval, maxInterval:maxInterval, amount:amount});
          }
        return res;
    }

    sort(key) {
        return _.sortBy(this.getAllCourses(), key);
    }

    #validate(course) {
    
    let error = '';

    error += (!this.#courseDate.courseName.includes(course.courseName)) ? 'error course name' : '';
    error += (!this.#courseDate.lecturers.includes(course.lecturerName)) ? `error lecture name` : '';
    error += (course.hours < this.#courseDate.minHours  ||  course.hours > this.#courseDate.maxHours) ? `error hourse` : '';
    error += (course.cost < this.#courseDate.minCost || course.cost > this.#courseDate.maxCost) ? `error cost` : '';
    error += (!this.#courseDate.type.includes(course.type)) ? `error type` : '';
    error += (course.dayEvening.length < 0 || course.dayEvening.length > this.#courseDate.timing.length) ? `error timing` : '';
    error += (this.#courseDate.minYear > course.openDate.getFullYear() && this.#courseDate.maxYear < course.openDate.getFullYear()) ? `error year` : '';

    for (let dy of course.dayEvening){
        if(!this.#courseDate.timing.includes(dy)){
            error += `error timing`;
        }
    }
    return error;
    }
}