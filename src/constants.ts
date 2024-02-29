import { OwnerType, TaskType } from "./types";

export const tasks: TaskType[] = [
  {
    title: "Clear table",
    startDate: new Date(),
    status: "in progress",
    priority: "low",
    endDate: new Date(),
    owners: "Samuel",
  },
  {
    title: "Code",
    startDate: new Date(),
    status: "not started",
    priority: "low",
    endDate: new Date(),
    owners: "Isaac",
  },
  {
    title: "Clear table",
    startDate: new Date(),
    status: "completed",
    priority: "moderate",
    endDate: new Date(),
    owners: "Samuel",
  },
  {
    title: "Clear table",
    startDate: new Date(),
    status: "in progress",
    priority: "high",
    endDate: new Date(),
    owners: "Samuel",
  },
  {
    title: "Code",
    startDate: new Date(),
    status: "not started",
    priority: "high",
    endDate: new Date(),
    owners: "Isaac",
  },
  {
    title: "Clear table",
    startDate: new Date(),
    status: "completed",
    priority: "high",
    endDate: new Date(),
    owners: "Samuel",
  },
];

export const owners: OwnerType[] = [
  {
    id: "1",
    name: "Samuel",
  },
  {
    id: "2",
    name: "Isaac",
  },
  {
    id: "3",
    name: "Justice",
  },
  {
    id: "4",
    name: "Wealth",
  },
  {
    id: "5",
    name: "Ruth",
  },
  {
    id: "6",
    name: "Ade",
  },
];
