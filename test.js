var ejs = require('ejs'); // loading EJS into our project

var template = "Hi <%= firstName %>, I can't believe I haven't seen you for <%= numMonthsSinceContact %>! We really gotta keep in touch better.\n Anyway, hit me up sometime and let's grab a cup of joe.\n David"

var emailTemplate = ejs.render(template, {
    firstName: "Scott",
    numMonthsSinceContact: new Date()

    })

console.log(emailTemplate)