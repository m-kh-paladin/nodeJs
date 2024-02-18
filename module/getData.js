const fs = require("fs");

const getData = (usersData, userDataPath, res) => {
    if (fs.existsSync(userDataPath)) {
        usersData = fs.readFileSync(userDataPath, "utf8")
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(usersData)
    } else {
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({
            status: 200,
            message: "there is not any user yet"
        }))
    }
}

module.exports = getData;
