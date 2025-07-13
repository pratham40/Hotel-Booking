export const getUserData = (req, res) => {
    try {
        const role = req.user.role;
        const recentSerachCities = req.user.recentSerachCities;
        res.status(200).json({
            success: true,
            role,
            recentSerachCities
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            success: false,
            message: "error in fetching user data"
        });
    }
}


