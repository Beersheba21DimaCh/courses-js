import _ from "lodash";
import { getRandomInteger } from "../util/random";

export default class Colledge {
    #coursesProvider;
    #courseDate;
    
    constructor(coursesProvider, courseDate) {
        this.#coursesProvider = coursesProvider;
        this.#courseDate = courseDate;
    }
    async addCourse(course) {
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openDate = new Date(course.openDate);
        let error;
        if( (error = this.#validate(course)) != ''){
            throw new Error(error);
        }
        const id = await this.#getId();
        course.id = id;
        return await this.#coursesProvider.add(course);
    }

    async removeCourse(id) { 
        return await this.#coursesProvider.remove(id); 
    }

    async #getId(){
        let rndId;
        do {
            rndId = getRandomInteger(this.#courseDate.minId, this.#courseDate.maxId);
        } while(await this.#coursesProvider.exists(rndId));
        return rndId;
    }

    async getAllCourses(){
       return await this.#coursesProvider.get();
    }

    async getElementsByHours(value){
        let interval = value.interval;
        let arr = await this.#coursesProvider.get();
        let objCnt =  _.countBy(arr, e => {   
           return Math.floor(e.hours/interval)*interval;
        });
        return this.#getInterval(objCnt, interval)
    }

    async getElementsByCost(value){
        let interval = value.interval;
        let arr = await this.#coursesProvider.get();
        let objCnt =  _.countBy(arr, e => {   
           return Math.floor(e.cost/interval)*interval;
        });
        return this.#getInterval(objCnt, interval)
    }

    #getInterval(objCnt, interval){
        let res = [];
        for (let key in objCnt) {
            let minInterval = key;
            let maxInterval = +key + +interval - 1;
            let amount = objCnt[key];
            res.push({minInterval:minInterval, maxInterval:maxInterval, amount:amount});
          }
        return res;
    }

    async sort(key) {
        return _.sortBy(await this.getAllCourses(), key);
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