const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// get routes
router.get('/', (req, res) => {
    Employee.find({})
    .then(employees => {
        res.render('index', {employees : employees});
    })
    .catch(err=> {
        console.log(err)
        res.redirect('/');
    })
})

router.get('/employee/new', (req,res) => {
    res.render('new');
})

router.get('/employee/search', (req,res)=> {
    res.render('search', {employee: ""});
})

router.get('/employee', (req,res) => {
    let searchQuery = {name : req.query.name};

    Employee.findOne(searchQuery)
        .then(employee => {
            res.render('search', {employee:employee})
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/edit/:id', (req,res) =>{

    let searchQuery = {_id : req.params.id};
    Employee.findOne(searchQuery)
    .then(employee => {
        res.render('edit', {employee:employee})
    })
    .catch(err => {
        console.log(err)
    })
})
// Post routes

router.post('/employee/new', (req,res)=> {
    let newEmployee = {
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    };

    Employee.create(newEmployee)
        .then(employee => {
            console.log('Employee data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/');
        });
});

// Put routes

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Employee.updateOne(searchQuery, {$set: {
        name: req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    }})
    .then(employee => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
});

// Delete route
router.delete('/delete/:id', (req,res)=> {
    let searchQuery = {_id : req.params.id}

    Employee.deleteOne(searchQuery)
    .then(employee=> {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;