/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            // alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            // let personDescendants = recursivelyFindPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()
function displayPeopleNonAlert(people) {
    
       let displayPeople= people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n");
        return displayPeople
}

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    // personInfo += `Parents: ${person.parents}\n`;
    // personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function findPersonFamily(person, people){
    // let personsParents = person.parents;
    // let familyMembers = people.filter(function (el) {
    //     if (el.id === personsParents[0] || el.id == personsParents[1]) {
    //         return true;}});
    let foundParents = displayPeopleNonAlert(findPersonsParents(person, people));
    let foundSiblings = displayPeopleNonAlert(findPersonSiblings(person, people));
    let foundSpouse = displayPeopleNonAlert(findPersonsSpouse(person,people));
    
    alert(`${person.firstName} ${person.lastName} Family: \n
        \n
        Parents:\n
        ${foundParents}\n\n
        Siblings:\n
        ${foundSiblings}\n\n
        Current Spouse:\n
        ${foundSpouse}`);}
    
  

function findPersonsParents(person,people){
    let personParents = people.filter(function(el){
        if(person.parents.includes(el.id)){
            return true;
        }
        
    })
    return personParents
}
function findPersonsSpouse(person,people){
    let personsSpouse = people.filter(function(el){
        if(person.currentSpouse === el.id){
            return true;
        }
        
    })
    return personsSpouse
}
function findPersonSiblings(person, people){
    let personsParents = person.parents;
    let personsSiblings = people.filter(function(el){
        if(personsParents.includes(el.parents[0]||el.parents[1])){
            return true;
        }
        
    })
    return personsSiblings
    
}

 function searchByTraits(people) {
    let displayOption = prompt(
        `Do you want to search by 'single trait', 'multiple traits'?\nType the option you want or type 'restart' or 'quit'.`
    );
    switch(displayOption){
        case "single trait":
            singleTrait(people);
            break;
        case "multiple traits":
            multipleTraits(people);
            break;
        default:
            return searchByTraits(people);
        }
    }
    

    
function singleTrait(people){
    let foundPeopleWithTraits;
    let displayOption = prompt(
        `Do you want to know their 'eyecolor', 'gender', 'height', or 'weight'?\nType the option you want or type 'restart' or 'quit'.`
    );
    
    switch (displayOption) {
        
        case "eyecolor":
            let eyeColor = promptFor("What is the person's eye color? \n list of colors: \t black, blue, brown, green, hazel", chars);
            foundPeopleWithTraits = displayPeople(findTrait(people, eyeColor));
            break;
        case "gender":
            let gender = promptFor("What is the person's gender? \n Genders: male, female ", chars);
            foundPeopleWithTraits = displayPeople(findTrait(people, gender));
            break;
        case "height":
            let height = promptFor("What is the person's height in inches?", chars);
            foundPeopleWithTraits = displayPeople(findTrait(people, height));
            break;
        case "weight":
            let weight = promptFor("What is the person's weight in pounds?", chars);
            foundPeopleWithTraits = displayPeople(findTrait(people, weight));
            break;
        case "restart":
            app(people);
            break;
        case "quit":
            return;
        default:
            return searchByTraits(people);
        }
        return foundPeopleWithTraits;
}
function multipleTraits(people){

    let eyecolor = prompt(
        `Input 'eyecolor':\nPress enter to skip or type 'restart' or 'quit'.`
    );
    let gender = prompt(
        `Input 'gender':\nPress enter to skip or type 'restart' or 'quit'.`
    );
    let height = prompt(
        `Input 'height':\nPress enter to skip or type 'restart' or 'quit'.`
    );
    let weight = prompt(
        `Input 'weight':\nPress enter to skip or type 'restart' or 'quit'.`
    );

    eyecolor = findTrait(people, eyecolor);
    gender = findTrait(people, gender);
    height = findTrait(people, height);
    weight = findTrait(people, weight);
    let foundPeopleWithTraits = people;
    if(eyecolor[0] !== undefined){foundPeopleWithTraits = foundPeopleWithTraits.filter(function(el){if(el.eyeColor === eyecolor[0].eyeColor){return true;}})}
    if(gender[0] !== undefined){foundPeopleWithTraits = foundPeopleWithTraits.filter(function(el){if(el.gender === gender[0].gender){return true;}})}
    if(height[0] !== undefined){foundPeopleWithTraits = foundPeopleWithTraits.filter(function(el){if(el.height === height[0].height){return true;}})}
    if(weight[0] !== undefined){foundPeopleWithTraits = foundPeopleWithTraits.filter(function(el){if(el.weight === weight[0].weight){return true;}})}


    return displayPeople(foundPeopleWithTraits);

}



function findTrait(people, input){
    let findTrait = people.filter(function (person) {
        if (person.eyeColor === input || person.gender === input || person.height === input || person.weight === input) {
            return true;
        }
    });
    return findTrait;
}


function findPersonDescendants(person, people){
    //Found First Generation
    //Need to find second generation
    let personDescendants = person.id;
    let familyDescendants = people.filter(function (el) {
        
    if (el.parents.includes(personDescendants)) {
        return true;}});
    
    let familySecondaryDescendants = familyDescendants.filter(function (el){
        let currentGeneration = people.filter(function(el2){
            if(el2.parents.includes(el.id)){
                return true}
        })
        return currentGeneration;
    })


    
    familyDescendants = Array.prototype.push.apply(familyDescendants, familySecondaryDescendants);
    

    if(familyDescendants.length === 0){
        alert(`${person.firstName} ${person.lastName} Family: \n
        \n
        No parents in the system.`)}

    if(familyDescendants) {
        alert(familyDescendants.map(function (person) {
            return `${person.firstName} ${person.lastName}`;
            })
            .join("\n"))}
   

    return familyDescendants;};
