const http = require("http");

const addData = require("./module/addData");
const getData = require("./module/getData");

const userDataPath = "./user.json"

const server = http.createServer((req, res) => {
    let data = "";
    req.on("data", chunk => {
        data += chunk;
    })
    req.on("end", () => {
        if (req.url === "/user/" && req.method === "POST") {
            let userData;
            try {
                userData = JSON.parse(data);
            } catch (error) {
                res.writeHead(400, { "content-Type": "application/json" });
                res.end(JSON.stringify({
                    status: 400,
                    error: "Invalid data format"
                }));
                return
            }
            addData(userData, userDataPath, res);
        } else if (req.url === "/users/" && req.method === "GET") {
            let usersData
            getData(usersData, userDataPath, res);
        } else {
            res.writeHead(404, { "content-Type": "application/json" })
            res.end(JSON.stringify({
                status: 404,
                error: "Not Found"
            }))
        }
    })

})

const port = 5000

server.listen(port, () => {
    console.log(`listening to ${port}`);
})


