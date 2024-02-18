
const fs = require("fs");

const addData = (userData, userDataPath, res) => {
    if (userData.name) {
        let usersData;
        if (fs.existsSync(userDataPath)) {
            try {
                const fileContent = fs.readFileSync(userDataPath, "utf8");
                if (fileContent.trim() !== "") {
                    usersData = JSON.parse(fileContent);
                } else {
                    usersData = [];
                }
            } catch (error) {
                res.writeHead(400, { "content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid data format" }));
                return
            }
        } else {
            usersData = [];
        }
        usersData.push(userData);

        fs.writeFileSync(userDataPath, JSON.stringify(usersData));

        res.writeHead(200, { "content-Type": "text/txt" });
        res.end("user added successfully");
    } else {
        res.writeHead(400, { "content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid user data" }));
    }
}

module.exports = addData;