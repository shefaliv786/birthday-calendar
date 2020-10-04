const AVAILABLE_COLORS = 9;
class Person {

    constructor(initials, weekDay, birthYear){
        this.initials = initials;
        this.weekDay = weekDay;
        this.birthYear = birthYear;
    }

    toString = (id, size)=>{
        return `<div class='person person-${id % AVAILABLE_COLORS}' style ='width: ${size}%; height:${size}%;'>
        ${this.initials}</div>`;
    }
}

class Card {

    constructor(persons, header, index){
        this.persons = persons;
        this.header = header;
        this.index = index;
    }

    toString = () =>{
        let strPersons = '';
        const len = this.persons.length;
        const size = getSize(len);
        if (this.persons){
            this.persons.forEach((person, index) => {
                strPersons+= person.toString(index, size);
            });
        }
        const footerText = len === 0 ? 'No birthdays' : len == 1 ? '1 birthday' : `${len} birthdays`;
        return `<div class='card'>
            <div class='card-header'>${this.header}</div>
                <div class="card-content ${ len === 0 ? 'empty' : ''}">
                  ${ len !== 0 ? strPersons : '<div><span>. .</span><span>~</span></div>'}
                </div>
                <div class="footer">
                 ${footerText}
                </div>
         </div>`;
    }
}

function getPersonFromData(personName, dobStr) {
        const initials = personName.split(' ');
        const initialsStr = initials[0][0]+initials[initials.length-1][0];
    
        /** Assuimg date format- MM/DD/YYYY */
    
        const dateOfBirth = new Date(dobStr);
        const year = dateOfBirth.getFullYear();
        const weekDay = dateOfBirth.getDay();
        return new Person(initialsStr,weekDay,year);
}

function getPersonListFromJSON(jsonString) {

        const jsonArray = JSON.parse(jsonString);
        let errorMessage = undefined;
        if(Array.isArray(jsonArray)) {
            const personsLIst = [];
            jsonArray.forEach(ele => {
                if (ele.name && ele.birthday) {
                    const personData = getPersonFromData(ele.name, ele.birthday);
                    if(isNaN(personData.weekDay)) {
                        errorMessage = `Error- Invalid date format for ${ele.name}`;
                    } else {
                        personsLIst.push(personData);
                    }
                }
                else {
                    throw Error("Invalid person data");
                }   
            });
            
            errorMessage && alert(errorMessage);
            
            return personsLIst;
        }
   return [];
}


function groupDataByWeekDay(persons, year) {
    const groups = {};

    if(Array.isArray(persons)){
        if(year){
            persons = persons.filter( p => p.birthYear === parseInt(year));
        }
        persons.forEach(person => {
            if(!groups.hasOwnProperty(person.weekDay)) {
                groups[person.weekDay] = [];
            }
            groups[person.weekDay].push(person);
        })
    }
    
    return groups;
}

/** Below function will caculate the size of the square box as per number of Person in card
*/
function getSize(len){

    len = len || 1;
    if (len <= 2) return 100 / len;
    const m = Math.ceil(Math.log2(len));
    return 100 / m;
    
}

const WEEK_DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const GROUPS = [0,1,2,3,4,5,6];

function getCards(groups){
    const cards = [];

    for(let id of GROUPS){
        if(groups[id]){
            cards.push(new Card(groups[id], WEEK_DAYS[id],id));
        }else{
            cards.push(new Card([], WEEK_DAYS[id],id));
        }
    }

    return cards; 
}


