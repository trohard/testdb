var School = require('../models/school');
var Student = require('../models/student');

exports.school_get = function(req, res) {
    let filters = req.query

	School.find(filters)
	.then(schools => {
		res.json({
			confirmation: 'success',
			data: schools
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.school_update = function(req, res) {
    res.send('NOT IMPLEMENTED');
}

exports.school_remove = function(req, res) {
    const query = req.query
    
    Student.find({'school':query.id})
    .then(students => {
        if (students.length) {
            res.json({
                confirmation: 'fail',
                message: 'School has students',
                data: students
            })
        } else {
            School.findByIdAndRemove(query.id)
	        .then(data => {
		        res.json({
			        confirmation: 'success',
			        data: 'School '+query.id+' successfully removed.'
		        })
	        })
	        .catch(err => {
		        res.json({
			        confirmation: 'fail',
			        message: err.message
		    })
	        })
        }
    })	
}

exports.school_id = function(req, res) {
    res.send('NOT IMPLEMENTED');
}

exports.school_post = function(req, res) {
    School.create(req.body)
	.then(school => {
		res.json({
			confirmation: 'success',
			data: school
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}