import { FC, useEffect, useState } from "react";
import { initUtils } from '@telegram-apps/sdk';

import GridLayout from "../../components/GridLayout/GridLayout";
import TaskBoxItem from "../../components/TaskBoxItem/TaskBoxItem";
import ListLayout from "../../components/ListLayout/ListLayout";
import ListItem from "../../components/ListItem/ListItem";
import UploadModal from "../../components/Popup/UploadModal";
import Header from "../../components/Header/Header";
import CountDown from "../../components/CountDown/CountDown";
import SignupModal from "../../components/Signup/Signup";

import { newTasks } from "../../data/dumyTasks";
import { useAppContext } from "../../context/useAppContext";
import { ListStyle } from "../../data/types";

import "./tasks.scss";
import InputModal from "../../components/InputModal/InputModal";
import SuccessAlert from "../../components/Alert/Success";

const listStyle: ListStyle = {
    listStyle: {
        padding: "15px 20px",
        cursor: "pointer"
    }
}

const TasksPage: FC = () => {
    const utils = initUtils();
    const { isAvailableAccess, setUploadType, userDailyTask, email, userData } = useAppContext();

    const [isBloodTest, setIsBloodTest] = useState<boolean>(false);
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [showMailing, setShowMailing] = useState<boolean>(false);
    const [alertContent, setAlertContent] = useState<string>("");
    const [isAlertVisible, setAlertVisible] = useState<boolean>(false);

    console.log("user daily task: ", userDailyTask);

    useEffect(() => {
        if (!isAvailableAccess) {
            setUploadType('blood');
            setIsBloodTest(true);
            setShowUploadModal(true);
        }
    }, [isAvailableAccess, setUploadType]);

    const handleBlockTaskClick = (taskTitle: string, index: number) => {
        console.log('Clicked Task Block Item!', taskTitle, index);
        // if (index !== 3) {
        const uploadType = taskTitle.toLowerCase();
        setUploadType(uploadType);
        setIsBloodTest(false);
        setShowUploadModal(true);
        // } else {
        //     console.log("Go Walking Blockchain logic!");
        // }
    }

    const joinTelegramGroup = () => {
        console.log("user data: ", userData);
        if (!userData.tgGroupId) {
            setAlertContent("You don't have Group ID yet.")
            setAlertVisible(true);
            return;
        }
        utils.openTelegramLink(userData.tgGroupId);
    }

    const joinMailingList = () => {
        console.log("email: ", email)
        if (!email) {
            setAlertContent("You need to Sign up to join.")
            setAlertVisible(true);
            return;
        }
        setShowMailing(true);
    }

    const closeSignup = () => {
        setShowSignup(false);
    }

    const openSignup = () => {
        setShowSignup(true);
    }

    const closeAlert = () => {
        setAlertVisible(false);
    };

    return (
        <div className="fitfox-tasks">
            <Header />

            <h2>Tasks</h2>

            <div className="task-grid">
                <div>
                    <h2>
                        Go on a Streak
                    </h2>
                    <p>Simple steps for a healthier life.</p>
                </div>

                <CountDown />

                <GridLayout>
                    {userDailyTask.map((task, index) => (
                        <TaskBoxItem
                            icon={<task.icon />}
                            photo={task.photo}
                            title={task.title}
                            point={task.totalNumber}
                            tooltip={task.tooltip}
                            key={index}
                            onClick={() => handleBlockTaskClick(task.title, index)}
                        />
                    ))}
                </GridLayout>
            </div>

            <div className="task-list">
                <h2>
                    New Tasks
                </h2>
                <ListLayout>
                    <ListItem title={newTasks[0].title} btnPoint={newTasks[0].reward} style={listStyle} onClick={openSignup} />
                    <ListItem title={newTasks[1].title} btnPoint={newTasks[1].reward} style={listStyle} onClick={joinTelegramGroup} />
                    <ListItem title={newTasks[2].title} btnPoint={newTasks[2].reward} style={listStyle} onClick={joinMailingList} />
                </ListLayout>
            </div>

            <SuccessAlert isVisible={isAlertVisible} onClose={closeAlert} content={alertContent} />
            {showUploadModal && <UploadModal isBloodTest={isBloodTest} onClose={() => setShowUploadModal(false)} setAlertVisible={setAlertVisible} />}
            {showSignup && <SignupModal onClose={closeSignup} setAlertVisible={setAlertVisible} />}
            {showMailing && <InputModal isAccessCode={false} setAlertVisible={setAlertVisible} onClose={() => setShowMailing(false)} onPassed={() => setShowMailing(false)} />}
        </div>
    );
};

export default TasksPage;
