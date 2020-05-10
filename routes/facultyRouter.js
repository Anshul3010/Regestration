const express = require('express');
const authController = require('../controllers/authController');
const Faculty = require('./../controllers/facultyController');
const libDue = require('../controllers/lib_dueController');
const student = require('../controllers/student');
const registeredStudent = require('../controllers/registerStudent');
const AggPipeline = require('../controllers/pipeline');

const Router = express.Router();

Router.route('/createFaculty').post(Faculty.createFaculty);
Router.route('/facultyLogin').post(authController.facultyLogin);
Router.route('/getAllStudents').get(authController.protect,authController.roleChecker, student.getAll);
Router.route('/getFilteredStudents').get(authController.protect,authController.roleChecker,student.getFilteredStudent);
Router.route('/getAllRegistered').get(authController.protect,authController.roleChecker, registeredStudent.getAll);
Router.route('/getFilteredRegesteredStudents').get(authController.protect,authController.roleChecker,registeredStudent.getFilteredRegesteredStudent);
Router.route('/clearDue').patch(authController.protect,authController.roleChecker,libDue.cleardue)
Router.route('/createStudent').post(authController.protect,authController.roleChecker,student.createStudent);
Router.route('/createLibDue').post(authController.protect,authController.roleChecker,authController.checkPayloadDue, libDue.createDue);
Router.route('/count').get(authController.protect,authController.roleChecker,AggPipeline.getCount);
Router.route('/summery').get(authController.protect,authController.roleChecker,AggPipeline.getSummery);
Router.route('/updateStudent').patch(authController.protect,authController.roleChecker,student.UpdateStudent);
Router.route('/updatePassword').patch(authController.protect,authController.roleChecker,authController.UpdatePassword);
Router.route('/logout').get(authController.logout);




module.exports = Router;