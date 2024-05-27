const express = require('express');
const app = express();


const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); 
    const hour = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(403).send('This web application is only available during working hours (Monday to Friday, from 9 to 17)');
    }
};


app.use(express.static('public'));


app.get('/', workingHoursMiddleware, (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
