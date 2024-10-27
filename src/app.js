const express = require("express");

const app = express();
const PORT = 7777;

//** POSTMAN Saved Link API Call Did not Work for Regex***/

// app.get("/ab?c", (req, res)=>{
//     res.send("b is Optional!");
// });
// app.get("/ab+c", (req, res)=>{
//     res.send("b also need and too many(bbbb) b also Accepted ");
// });
// app.get("/ab*cd", (req, res)=>{
//     res.send("In Between ab => Here <= Anything Arr Acceptabel !");
// });
// app.get("/a(bc)?d", (req, res)=>{
//     res.send("At the same time bc is Optional! Seperately b and c is not applicable");
// });
// app.get("/a(bc)+d", (req, res)=>{
//     res.send("At the same time too Many(bcbcbc) bc acceptibel, Any seprate (bcbcb) is not acceptable");
// });
// app.get(/a/, (req, res)=>{
//     res.send("Regex Acceptable!, if the path text contains 'a' it will work");
// });
// app.get(/fly$/, (req, res)=>{
//     res.send("Regex Acceptable!, End With 'fly' will work. But Combined 'starting with' regex did not work" );
// });

app.get("/bird*", (req, res)=>{
    res.send("Default start With 'bird' will work. But Combined 'starting with' regex did not work" );
});

/**** postman link = http://localhost:7777/user?userId=101&name=Praveen ****/
// app.get("/user", (req, res)=>{
//     console.log(req.query);
//     res.send("User Id fetche via Query!");
// });

/**** postman link = http://localhost:7777/user/101/Praveen/Ariyalur  */
app.get("/user/:id/:name/:city", (req, res)=>{
    console.log(req.params);
    res.send("User Id fetche via Params!");
});

app.listen(PORT, ()=>{
    console.log(`Server Listening at port -${PORT}`);
});