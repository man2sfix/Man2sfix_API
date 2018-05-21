const express = require('express');

const router = express.Router();
const Controller = require('./member.controller.js');

// get user list
router.get('/', Controller.getAllMember);

// get user
router.get('/:id', Controller.getMember);

// get user email
router.get('/email/:email', Controller.getMemberEmail);

// find user email
router.post('/find/email', Controller.findMemberEmail);

// find user email
router.post('/find/password', Controller.findMemberPassword);

// change password
router.post('/change/password', Controller.changePassword);

// create user
router.post('/', Controller.createMember);

// Delete user
router.delete('/:id', Controller.deleteMember);

// update user
router.put('/', Controller.updateMember);

module.exports = router;
