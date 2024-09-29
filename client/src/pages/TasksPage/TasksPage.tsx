import { FC, useEffect, useState } from "react";

import GridLayout from "../../components/GridLayout/GridLayout";
import TaskBoxItem from "../../components/TaskBoxItem/TaskBoxItem";
import { healthTasks, newTasks } from "../../data/dumyTasks";
import { useAppContext } from "../../context/useAppContext";

import "./tasks.scss";
import ListLayout from "../../components/ListLayout/ListLayout";
import ListItem from "../../components/ListItem/ListItem";
import UploadModal from "../../components/Modal/UploadModal";
import { ListStyle } from "../../data/types";
import Header from "../../components/Header/Header";

const listStyle: ListStyle = {
    listStyle: {
        padding: "15px 20px",
        cursor: "pointer"
    }
}

const TasksPage: FC = () => {
    const {isBloodExamExist, setUploadType} = useAppContext();

    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

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
                <GridLayout>
                    {healthTasks.map((task, index) => (
                        <TaskBoxItem
                            icon={task.icon}
                            title={task.title}
                            point={task.totalNumber}
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
                    {
                        newTasks.map((newTask, index) => 
                            <ListItem title={newTask.title} btnPoint={newTask.reward} style={listStyle} key={index} />
                        )
                    }
                </ListLayout>
            </div>
            
            {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
        </div>
    );
};

export default TasksPage;
