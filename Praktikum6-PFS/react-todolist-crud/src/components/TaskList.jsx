import { Card, Badge, Button } from "react-bootstrap";
import { Pencil, Trash2, CalendarDays } from "lucide-react";

function TaskList({ tasks, onEdit, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "success";
      case "In Progress":
        return "primary";
      case "To Do":
        return "secondary";
      default:
        return "secondary";
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-5">
        <h5>Belum ada tugas</h5>
        <p className="text-muted">Tambahkan tugas baru untuk memulai.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Card className="mb-3 shadow-sm" key={task.id}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-2">{task.name}</h6>

                <div className="d-flex flex-wrap gap-2 mb-2">
                  <Badge bg={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>

                  <Badge bg={getStatusColor(task.status)}>{task.status}</Badge>
                </div>

                <small className="text-muted">
                  <CalendarDays size={14} className="me-1" />
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString("id-ID")
                    : "Tanggal tidak tersedia"}
                </small>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(task)}
                  title="Edit tugas"
                >
                  <Pencil size={14} />
                  <span className="ms-1">Edit</span>
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  title="Hapus tugas"
                >
                  <Trash2 size={14} />
                  <span className="ms-1">Delete</span>
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default TaskList;
