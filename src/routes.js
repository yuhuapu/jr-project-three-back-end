const express = require('express');
const router = express.Router();

const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const tutorRouter = require('./routes/tutor');
const authRouter = require('./routes/auth');

router.use('/students', studentRouter);
router.use('/courses', courseRouter);
router.use('/tutors', tutorRouter);
router.use('/auth', authRouter);

module.exports = router;