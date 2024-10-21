import AccessCode from "../models/AccessCode.js";

export const validateCode = async (code, id) => {
    try {
        const accessCode = await AccessCode.findOne({code});
    
        if (!accessCode) {
            return {
                success: false,
                message: "Code not exist",
                status: 404
            }
        } else if (accessCode.isUsed || accessCode.userId !== "") {
            return {
                success: false,
                message: "Code already used",
                status: 401
            }
        } else {
            await AccessCode.updateOne(
                { code }, 
                { $set: { isUsed: true, usedDate: new Date(), userId: id } }
              );

            return {
                success: true,
                message: "sucess",
                status: 200
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Error occured while accessing code",
            status: 500
        }
    }
}