import { FC, useEffect, useState } from "react";

import GridLayout from "../../components/GridLayout/GridLayout";
import TaskBoxItem from "../../components/TaskBoxItem/TaskBoxItem";
import ListLayout from "../../components/ListLayout/ListLayout";
import ListItem from "../../components/ListItem/ListItem";
import UploadModal from "../../components/Popup/UploadModal";
import Header from "../../components/Header/Header";
import CountDown from "../../components/CountDown/CountDown";
import SignupModal from "../../components/Signup/Signup";

import { healthTasks, newTasks } from "../../data/dumyTasks";
import { useAppContext } from "../../context/useAppContext";
import { ListStyle } from "../../data/types";

import "./tasks.scss";

const listStyle: ListStyle = {
    listStyle: {
        padding: "15px 20px",
        cursor: "pointer"
    }
}

const TasksPage: FC = () => {
    const { isBloodExamExist, setUploadType } = useAppContext();

    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);

    useEffect(() => {
        if (!isBloodExamExist) {
            setUploadType('blood');
            setShowUploadModal(true);
        }
    }, [isBloodExamExist, setUploadType]);

    const handleBlockTaskClick = (taskTitle: string, index: number) => {
        console.log('Clicked Task Block Item!', taskTitle, index);
        if (index !== 3) {
            const uploadType = taskTitle.toLowerCase();
            setUploadType(uploadType);
            setShowUploadModal(true);
        } else {
            console.log("Go Walking Blockchain logic!");
        }
    }

    const closeSignup = () => {
        setShowSignup(false);
    }

    const openSignup = () => {
        setShowSignup(true);
    }

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
                    {healthTasks.map((task, index) => (
                        <TaskBoxItem
                            icon={<task.icon />}
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
                    <ListItem title={newTasks[1].title} btnPoint={newTasks[1].reward} style={listStyle} />
                    <ListItem title={newTasks[2].title} btnPoint={newTasks[2].reward} style={listStyle} />
                </ListLayout>
            </div>

            {showUploadModal && <UploadModal isBloodTest={true} onClose={() => setShowUploadModal(false)} />}
            {showSignup && <SignupModal onClose={closeSignup} />}
        </div>
    );
};

export default TasksPage;
