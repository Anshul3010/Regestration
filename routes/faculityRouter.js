const express = require('express');
const authController = require('./../controllers/authController');
const Faculity = require('./../controllers/faculityController');
const libDue = require('./../controllers/lib_dueController');
const student = require('./../controllers/student');
const registeredStudent = require('./../controllers/registerStudent');
const AggPipeline = require('./../controllers/pipeline');

const Router = express.Router();

Router.route('/createFaculity').post(Faculity.createFaculity);
Router.route('/faculityLogin').post(authController.faculityLogin);
Router.route('/getAllStudents').get(authController.protect,authController.roleChecker, student.getAll);
Router.route('/getFilteredStudents').get(authController.protect,authController.roleChecker,student.getFilteredStudent);
Router.route('/getAllRegistered').get(authController.protect,authController.roleChecker, registeredStudent.getAll);
Router.route('/getFilteredRegesteredStudents').get(authController.protect,authController.roleChecker,registeredStudent.getFilteredRegesteredStudent);
Router.route('/clearDue').patch(authController.protect,authController.roleChecker,libDue.cleardue)
Router.route('/createStudent').post(authController.protect,authController.roleChecker,student.createStudent);
Router.route('/createLibDue').post(authController.protect,authController.roleChecker, libDue.createDue);
Router.route('/count').get(authController.protect,authController.roleChecker,AggPipeline.getCount);
Router.route('/summery').get(authController.protect,authController.roleChecker,AggPipeline.getSummery);
Router.route('/logout').get(authController.logout);




module.exports = Router;