import userModel from "../config/models/userModel.js";


export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("🔍 ID reçu dans la route :", userId);

        if (!userId) {
            return res.status(401).json({ success: false, message: "Aucun ID utilisateur fourni." });
        }

        const user = await userModel.findById(userId).select("-password");
        console.log("👤 Utilisateur trouvé :", user);

        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur introuvable." });
        }

        /*return res.json({ success: true, userData: user });*/
        const employee = await employeeModel.findOne({ user: userId });

        // 3. Send BOTH pieces of data
        return res.status(200).json({ 
            success: true, 
            user,       // Contains Name, Email
            employee    // Contains Address, Phone, Department, etc.
        });
    } catch (error) {
        console.error("❌ Erreur dans getUserData :", error);
        return res.status(500).json({ success: false, message: "Erreur serveur." });
    }
};

export default getUserData;