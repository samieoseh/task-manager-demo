import { render, screen } from "@testing-library/react";
import Board from "@/components/Board";
import { DraggableProvided } from "react-beautiful-dnd";
import { TaskType } from "@/types";
import "@testing-library/jest-dom";

jest.mock("@/TaskContext", () => ({
  useTasks: () => ({
    removeTask: jest.fn(),
    editTask: jest.fn(),
  }),
}));

jest.mock('@/hooks/useTaskForm', () => ({
  __esModule: true, // This line is important when mocking default exports
  default: jest.fn(() => ({
    // Mocked return value of the hook
  })),
}))

test("renders without crashing", () => {
  const mockTask: TaskType = {
    id: "1",
    title: "Test Task",
    priority: "low",
    status: "completed",
    comments: [],
    startDate: new Date(),
    endDate: new Date(),
    owners: ["Owner1"],
  };
  const mockProvided: DraggableProvided = {
    draggableProps: {
      "data-rbd-draggable-context-id": "some-context-id",
      "data-rbd-draggable-id": "some-draggable-id",
    },
    dragHandleProps: {
      // Add required properties to satisfy the TypeScript interface
      "data-rbd-drag-handle-draggable-id": "draggable-1",
      "data-rbd-drag-handle-context-id": "0",
      "aria-describedby": "some-description",
      role: "button",
      tabIndex: 0,
      onDragStart: jest.fn(),
      draggable: false,
    },
    innerRef: jest.fn(), // or () => {}
  }; // Provide minimal mock data as needed
  render(<Board task={mockTask} provided={mockProvided} />);

  expect(screen.getByText(mockTask.title.toUpperCase())).toBeInTheDocument();
});
