import axios from "axios";

export const createNewPlayer = async (userData: any) => {
    const newPlayer = {
        tgId: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        score: 0,
    }

    try {
        await axios.post(`${process.env.SERVER_URL}/users/`, newPlayer);
        console.log("New player created successfully");
    } catch (error: any) {
        console.log('Error creating new player: ', error);
        throw error;
    }
}

export const initPlayer = async (userData: any) => {
    try {
        await axios.get(`${process.env.SERVER_URL}/users/${userData.id}`);
        console.log("Player already exist!");
        return;
    } catch(error: any) {
        if (error.response && error.response.status === 404) {
            try {
                console.log("User not found, creating new User...");
                await createNewPlayer(userData);
            } catch (error) {
                console.error("Error creating User: ", error);
                throw error;
            }
        } else {
            console.log("Error fetching User: ", error);
            throw error;
        }
    }
}