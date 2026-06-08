type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  status: string;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number) => void;
};

function TaskCard({
  id,
  title,
  description,
  status,
  onDelete,
  onUpdateStatus,
}: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p className="task-description">
        {description}
      </p>

      <p className="task-status">
        Status: {status}
      </p>

      <div className="task-actions">
        {status !== "Done" && (
          <button
            onClick={() =>
              onUpdateStatus(id)
            }
          >
            Advance
          </button>
        )}

        <button
          onClick={() =>
            onDelete(id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;