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


export const recentSerachCities = async (req, res) => {
    try {
        const {recentSerachCity} = req.body;
        const user = req.user;

        if (user.recentSerachCities.length <3) {
            user.recentSerachCities.push(recentSerachCity);
        }else{
            user.recentSerachCities.shift();
            user.recentSerachCities.push(recentSerachCity);
        }

        await user.save({
            validateBeforeSave: false
        });

        return res.status(200).json({
            success: true,
            message: "recent serach city updated successfully"
        });

    } catch (error) {
        console.error("Error updating recent search cities:", error);
        return res.status(500).json({
            success: false,
            message: "error in updating recent serach cities"
        });
    }
}
