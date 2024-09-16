import { FC } from "react";

import GridLayout from "../../components/GridLayout/GridLayout";
import TaskBoxItem from "../../components/TaskBoxItem/TaskBoxItem";
import { healthTasks, newTasks } from "../../data/dumyTasks";

import "./tasks.scss";
import ListLayout from "../../components/ListLayout/ListLayout";
import ListItem from "../../components/ListItem/ListItem";

const TasksPage: FC = () => {
    return (
        <div className="fitfox-tasks">
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
                            <ListItem title={newTask.title} btnPoint={newTask.reward} key={index} />
                        )
                    }
                </ListLayout>
            </div>
        </div>
    );
};

export default TasksPage;
