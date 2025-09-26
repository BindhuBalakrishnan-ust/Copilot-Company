const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin'); // Assuming an Admin model exists
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

router.get('/pending-users', async (req, res) => {
    const users = await User.find({ status: 'pending' });
    res.json({ users });
});

router.post('/users/:id/approve', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ message: 'User approved' });
});

router.post('/users/:id/reject', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User rejected' });
});

module.exports = router;
