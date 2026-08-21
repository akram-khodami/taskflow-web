import TaskCard from './TaskCard';

function TaskList({ tasks, project }) {
    if (tasks.length === 0) {
        return (
            <div className="rounded-xl bg-white p-8 text-center shadow">
                <p className="text-gray-600">
                    No tasks found.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    projectId={project.id}
                />
            ))}
        </div>
    );
}

export default TaskList;