const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const config = require('config');
const mongoose = require('mongoose');
const path = require('path')
const initMockData = require('./startup/initMockData')
const chalk = require("chalk");
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/api", routes)

const PORT = config.get('port') || 8080

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))

    const indexPath = path.join(__dirname, 'client', 'index.html')

    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initMockData();
        })
        await mongoose.connect(config.get('mongoURI'))
        console.log(chalk.green('MongoDB is connected'))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server is running on port ${PORT}...`))
        })
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()