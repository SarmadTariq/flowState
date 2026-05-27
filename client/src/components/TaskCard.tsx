type TaskCardProps = {
  id: number;
  title: string;
  status: string;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number) => void;
};

function TaskCard({ id, title, status, onDelete, onUpdateStatus }: TaskCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{status}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onUpdateStatus(id)}>Update Status</button>
    </div>
  );
}

export default TaskCard;