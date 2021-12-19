import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css"
import { getRandomElement, getRandomInteger } from "./util/random";
import courseData from "./config/courseData.json";
import Colledge from "./services/colledge";
import { courseProvider } from "./config/servicesConfig";
import createCourse from "./models/Course";
import FormHandler from "./ui/form-handler";
import TableHandler from "./ui/table-handler";
const N_RANDOM_COURSES = 10;
const colledge = new Colledge(courseProvider, courseData);
createRandomCourses();
// debugDisplayColledge();

function createRandomCourses(){
    let arrCourses = [];
    
    for(let i = 0; i < N_RANDOM_COURSES; i++){
        let course = createCourse(getCourseName(), getLecturerName(), getHours(), getCost(), getType(), getDayEvening(), getOpenDate());
        colledge.addCourse(course);
    }
    function getCourseName(){
        return getRandomElement(courseData.courseName);
    }
    function getLecturerName(){
        return getRandomElement(courseData.lecturers);
    }
    function getHours(){
        return getRandomInteger(courseData.minHours, courseData.maxHours);
    }
    function getCost(){
        return getRandomInteger(courseData.minCost, courseData.maxCost);
    }
    function getType(){
        return getRandomElement(courseData.type);
    }
    function getDayEvening(){
        return [getRandomElement(courseData.timing)];
    }
    function getOpenDate(){
        return new Date(getRandomInteger(courseData.minYear, courseData.maxYear), getRandomInteger(1, 12), getRandomInteger(1, 28));
    }

}
function debugDisplayColledge(){
   let array = colledge.getAllCourses();
   array.forEach(element => {
       console.log(JSON.stringify(element));
    //    console.table(element);
   });
}
const formCourses = new FormHandler("course-form", "idAlert");
const coursesSort = function(key) {
    tableCourse.clear();
    colledge.sort(key).forEach(c => tableCourse.addRow(c, c.id));
}
const nameOfRemoveFunc = "rm";
const tableCourse = new TableHandler("courses-header", "courses-body", ["id", "courseName", "lecturerName", "hours", "cost", "openDate"], coursesSort, nameOfRemoveFunc);

colledge.getAllCourses().forEach(c => tableCourse.addRow(c, c.id));
FormHandler.fillOptions("course-name", courseData.courseName);
FormHandler.fillOptions("lacturer-name", courseData.lecturers);
formCourses.addHandler(colledge.addCourse.bind(colledge));

// 

window.rm = function(id) { 
    if (TableHandler.confirm(`Are you shure to remove course with ID ${id}`)) { 
        tableCourse.removeRow(id); 
        colledge.removeCourse(id); 
    } 
}


const getIntervalHours = function(interval) {
    tableIntervalHours.clear();
    let arr = colledge.getElementsByHours(interval);
    arr.forEach(c => tableIntervalHours.addRow(c, c.amount));   
}

const formHoursStatistics = new FormHandler("hours-statistics-form");
FormHandler.fillOptions("select-hours", courseData.hoursDivider);
formHoursStatistics.addHandler(getIntervalHours);
const tableIntervalHours = new TableHandler("interval-hours-header", "interval-hours-body", ["minInterval", "maxInterval", "amount"]);


const getIntervalCost = function(interval) {
    tableIntervalcost.clear();
    let arr = colledge.getElementsByCost(interval);
    arr.forEach(c => tableIntervalcost.addRow(c, c.amount));   
}

const formCostStatistics = new FormHandler("cost-statistics-form");
FormHandler.fillOptions("select-cost", courseData.costDivider);
formCostStatistics.addHandler(getIntervalCost);
const tableIntervalcost = new TableHandler("interval-cost-header", "interval-cost-body", ["minInterval", "maxInterval", "amount"]);


