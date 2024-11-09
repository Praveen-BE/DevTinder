const validator = require("validator");

const validateSignUpData = (req) =>{
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not Valid !");
    }

    else if(firstName.length<4 || firstName.length>50){
        throw new Error("First Name should be 4 to 50 Characters");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Email is Not Valid !");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter Strong Password...");
    }
}

const validateSignInData = (req) =>{
    const { emailId, password } = req.body;

    if(!validator.isEmail(emailId)){
        throw new Error("Email is Not Valid !");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter the Valid Password");
    }

}

module.exports = { validateSignUpData, validateSignInData };