const authController = require('./../controllers/authController');
const registerStudent = require('./../controllers/registerStudent');
const student = require('./../controllers/student');
const Due = require('./../controllers//lib_dueController');

const express = require('express');

const Router = express.Router();

Router.route('/studentLogin').post(authController.studentLogin);
Router.route('/studentDue').get(authController.protect, Due.checkDue);
Router.route('/semesterRegister').post(authController.protect, authController.checkPayload,registerStudent.register);
Router.route('/logout').get(authController.logout);


module.exports = Router;