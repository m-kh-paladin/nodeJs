
const fs = require("fs");

const addData = (userData, res) => {
    if (userData.name) {
        let usersData = [];
        if (fs.existsSync(process.env.userDataPath)) {
            try {
                const fileContent = fs.readFileSync(process.env.userDataPath, "utf8");
                if (fileContent.trim() !== "") {
                    usersData = JSON.parse(fileContent);
                } 
            } catch (error) {
                res.writeHead(400, { "content-Type": "application/json" });
                res.end(JSON.stringify({
                    status: 400,
                    error: "Invalid data format"
                }));
                return
            }
        }
        usersData.push(userData);

        fs.writeFileSync(process.env.userDataPath, JSON.stringify(usersData));

        res.writeHead(200, { "content-Type": "application/json" });
        res.end(JSON.stringify({
            status: 200,
            message: "user added successfully"
        }));
    } else {
        res.writeHead(400, { "content-Type": "application/json" });
        res.end(JSON.stringify({
            status: 400,
            error: "Invalid user data"
        }));
    }
}

module.exports = addData;