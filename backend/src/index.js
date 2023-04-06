const express = require("express")
const bodyParser = require("body-parser")
const route=require("./routes/route")
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',route)


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})
