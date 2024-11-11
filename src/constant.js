const defaultProfile = "https://th.bing.com/th?q=Default+Profile+Avatar+PNG&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247";

const defaultAbout = "This is a default about of the User";

const ALLOWED_UPDATES = ["firstName","lastName", "photoUrl", "about", "gender", "age", "skills"];

module.exports = { defaultProfile, defaultAbout, ALLOWED_UPDATES };