const express = require('express')
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('employees')

router.get('/',(req,res)=>{
    res.render('employee/addOrEdit',{
        viewTitle:"Insert Employee"
    })
})
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

async function insertRecord(req, res) {
    try {
        const employee = new Employee({
            fullName: req.body.fullName,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city
        });
        const validationError = employee.validateSync();
        if (validationError) {
            const errorMessages = {}
        
            for (let field in validationError.errors) {
                errorMessages[field] = validationError.errors[field].message;
            }
            return res.render("employee/addOrEdit", {
                viewTitle: "Insert Employee",
                employee: req.body,
                errorMessage: errorMessages  
            });
        }
        const savedEmployee = await employee.save();
        console.log('Employee saved successfully:', savedEmployee);
        
        res.redirect('/employee/list');
    } catch (error) {
        console.error('Error saving employee:', error);
    }
}


async function updateRecord(req, res) {
    try {
        const employeeId = req.body._id;
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.redirect('/employee/list');
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Error updating employee', error: error });
    }
}

router.get('/list', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render("employee/list", {
            list: employees.map(employee => employee.toObject())
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, message: 'Error fetching employees', error: error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee: employee.toObject() 
        });
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching employee by ID', error: error });
    }
});


router.get('/delete/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.redirect('/employee/list');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Error deleting employee', error: error });
    }
});

module.exports = router

