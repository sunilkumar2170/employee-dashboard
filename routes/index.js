const express = require('express');
const router = express.Router();
const EmployeeModel = require('../mongo');  // अपनी model की सही path दे देना

// GET: सभी employees दिखाए और form दिखाए
router.get('/', async (req, res) => {
    try {
        const empo = await EmployeeModel.find();
        res.render('html', {
            title: 'employee-dashboard',
            employees: empo
        });
    } catch (err) {
        console.error("❌ Error fetching employees:", err);
        res.status(500).send("Server Error");
    }
});

// POST: नया employee add करे
router.post('/', async (req, res) => {
    try {
        const { name, email, etype, hour, totalhour } = req.body;

        const newEmployee = new EmployeeModel({
            name,
            email,
            etype,
            hour,
            totalhour
        });

        await newEmployee.save();

        // नए डेटा के साथ list फिर से दिखाए
        const empo = await EmployeeModel.find();
        res.render('html', {
            title: 'Records',
            employees: empo
        });

    } catch (err) {
        console.error("❌ Error saving employee:", err);
        res.status(500).send("Server Error");
    }
});

router.post('/search/', async (req, res) => {
  try {
    const { name, email, etype } = req.body;
    let filterparameter = {};

    if (name && email && etype) {
      filterparameter = { name, email, etype };
    } else if (name && email) {
      filterparameter = { name, email };
    } else if (name && etype) {
      filterparameter = { name, etype };
    } else if (email && etype) {
      filterparameter = { email, etype };
    } else if (name) {
      filterparameter = { name };
    } else if (email) {
      filterparameter = { email };
    } else if (etype) {
      filterparameter = { etype };
    }

    const empo = await EmployeeModel.find(filterparameter);
    res.render('html', { title: 'Filtered Employees', employees: empo });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
