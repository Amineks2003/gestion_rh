import express from 'express'
// fixed path: middlewares (plural)
import userAuth from '../middlewares/userAuth.js';
import userModel from '../config/models/userModel.js';

const userRouter = express.Router();

// Inline handler to avoid module export mismatch issues
userRouter.get('/data', userAuth, async (req, res) => {
	try {
		const userId = req.userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Aucun ID utilisateur fourni.' });
		const user = await userModel.findById(userId).select('-password');
		if (!user) return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
		return res.json({ success: true, userData: user });
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Erreur serveur.' });
	}
});
export default userRouter;