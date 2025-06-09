const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));  // ✅ Yeh pehle hona chahiye
app.use(express.json());

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
