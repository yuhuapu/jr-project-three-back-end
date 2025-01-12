const Tutor = require('../models/tutor');
const Course = require('../models/course');

async function addTutor(req, res) {
    const { firstName, lastName, email, password, service } = req.body;
    const tutor = new Tutor({
        firstName,
        lastName,
        email,
        password,
        title,
        service
    });

    await tutor.save();
    return res.json(tutor);
}

async function getAllTutor(req, res) {
    const tutors = await Tutor.find().populate('courses', 'courseName');
    return res.json(tutors);
}

async function getTutor(req, res) {
    const { id } = req.params;

    const tutor = await Tutor.findById(id);

    //error message not showing correctly if id is missing one digit
    if (!tutor) {
        return res.status(404).json('Tutor not found');
    }
    return res.json(tutor);
}

async function updateTutor(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, service } = req.body;
    const newTutor = await Tutor.findByIdAndUpdate(id,
        { firstName, lastName, email, password, service },
        { new: true }
    );

    if (!newTutor) {
        return res.status(404).json('Tutor not found');
    }

    return res.json(newTutor);
}

async function deleteTutor(req, res) {
    const { id } = req.params;
    const tutor = await Tutor.findByIdAndDelete(id);
    if (!tutor) {
        return res.status(404).json('Tutor not found');
    }
    return res.sendStatus(200);
}

async function addCourse(req, res) {
    const { id, code } = req.params;
    const tutor = await Tutor.findById(id);
    const course = await Course.findById(code);

    if (!tutor || !course) {
        return res.status(404).json('tutor or course not found')
    }

    tutor.courses.addToSet(course._id);
    course.tutorId.addToSet(tutor._id);

    await tutor.save();
    await course.save();
    return res.json(tutor);
}

async function deleteCourse(req, res) {
    const { id, code } = req.params;

    const tutor = await Tutor.findById(id);
    const course = await Course.findById(code);

    if (!tutor || !course) {
        return res.status(404).json('tutor or course not found')
    }

    tutor.courses.pull(course._id);
    course.tutorId.pull(tutor._id);
    await tutor.save();
    await course.save();
    return res.json(tutor);
}

module.exports = {
    addTutor,
    getAllTutor,
    getTutor,
    updateTutor,
    deleteTutor,
    addCourse,
    deleteCourse
}