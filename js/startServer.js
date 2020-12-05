let port = 3000;
let server;
function startServer() {
    try {
        const express = require('express')
        const app = express()
        const fs = require("fs");
        var ip = require("ip");
       document.getElementById("info").innerHTML = "Listening at: <b>" + ip.address() + ":" + port + "</b>";
        document.getElementById("button").classList = "btn stop";
        document.getElementById("button").innerHTML = "Stop";
        document.getElementById("button").onclick = stopServer;
        let home = require("electron").remote.app.getPath("home");

        app.use(function (req, res) {
            if (req.path == "/favicon.ico") return;
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
            document.getElementById("log").innerHTML += "GET " + req.path + " From: " + ip + "<br>";


            fs.lstat(home + decodeURI(req.path),function (err,data) {
                if (data.isDirectory()) {
                    let response = "<a href='../'>..</a><br>";
                    fs.readdir(home + req.path,function (err,files) {
                        for (let i=0;i<files.length;i++) {
                            if (req.path == "/") response += "<a href='/" + encodeURI(files[i]) + "'>" + files[i] + "</a><br>";
                            else response += "<a href='" + req.path + "/" + encodeURI(files[i]) + "'>" + files[i] + "</a><br>";
                        }
                        res.send(response);
                    })
                } else if (data.isFile()) {
                    return res.download(home + decodeURI(req.path));
                }
            })
        })
        server = app.listen(port)
    } catch(err) {
        alert("Error Occurred: " + err)
    }
}
function stopServer() {
    try {
       require("electron").remote.app.exit()
    } catch(err) {
        alert("Error Occurred: " + err)
    }
}