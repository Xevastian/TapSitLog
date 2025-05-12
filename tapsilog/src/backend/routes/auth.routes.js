import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/getUsername/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await User.findById(id);
        res.status(200).json(response);
    }catch (error) {
        res.status(404).json({ message: "Error fetching username", error });
    }
});


export default router;
