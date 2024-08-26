const express = require('express')
const cors = require('cors')

const connectToDB = require("./config/mongoDB/connect")
const users = require("./src/routes/userRoute")
const notes = require("./src/routes/notesRoute")

// firebase config file
// const firebase = require("./config/firebase")

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("RitualPlanner")
})

app.use("/api/users", users)
app.use("/api/notes", notes)

app.listen(PORT, connectToDB);