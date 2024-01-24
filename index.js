const port = 3000;
const express = require('express');
const fs = require('fs');
app = express();

app.get('/', (req, res) => {
    fs.readFile('count.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let count = JSON.parse(data);
            count.countRoot = count.countRoot + 1;
            res.send(`
                    <h1>Root</h1>
                    <a href="http://localhost:3000/about">about</a>
                    <h2>Count of root page views: ${count.countRoot}</h2>
            `);
            fs.writeFile('count.json', JSON.stringify(count), (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Root count changed', count.countRoot);
                }
            })
        }
    })
});

app.get('/about', (req, res) => {
    fs.readFile('count.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let count = JSON.parse(data);
            count.countAbout = count.countAbout + 1;
            res.send(`
                    <h1>About</h1>
                    <a href="http://localhost:3000/">root</a>
                    <h2>Count of about page views: ${count.countAbout}</h2>
            `);
            fs.writeFile('count.json', JSON.stringify(count), (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('About count changed', count.countAbout);
                }
            })
        }
    })
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});