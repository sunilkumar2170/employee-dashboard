// mongo.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true });

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hour: Number,
    totalhour: Number
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);

// ✅ सिर्फ model export करो
module.exports = EmployeeModel;
