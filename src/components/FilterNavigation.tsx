import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import UserGroup from "./icons/user-group";
import { Button } from "./ui/button";
import { useState } from "react";
import User from "./icons/user";
import Team from "./icons/team";
import { Input } from "./ui/input";
import { useTasks } from "@/TaskContext";

const renderMenu = (selectedMenu: string) => {
  switch (selectedMenu) {
    case "all":
      return (
        <>
          <UserGroup />
          <p>All Members</p>
        </>
      );
    case "tasks":
      return (
        <>
          <User />
          <p>My Tasks</p>
        </>
      );
    case "team":
      return (
        <>
          <Team />
          <p>My Team</p>
        </>
      );
  }
};

export default function FilterNavigation() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const { selectedFilter, setSelectedFilter } = useTasks();
  return (
    <div className="w-full py-8 flex justify-between">
      <Menubar className="bg-[#d7dde6] hover:bg-[#d7dde6] focus:bg-[#d7dde6] cursor-pointer">
        <MenubarMenu>
          <MenubarTrigger className="flex gap-2 data-[state=open]:bg-[#d7dde6] data-[state=open]:text-accent-foreground focus:bg-[#d7dde6] focus:text-accent-foreground">
            {renderMenu(selectedMenu)}
          </MenubarTrigger>
          <MenubarContent className="p-4 flex flex-col  gap-2">
            <MenubarItem
              onClick={() => setSelectedMenu("all")}
              className="flex items-center gap-2"
            >
              <UserGroup />
              All Members
            </MenubarItem>
            <MenubarItem
              onClick={() => setSelectedMenu("tasks")}
              className="flex items-center gap-2"
            >
              <User />
              My Tasks
            </MenubarItem>
            <MenubarItem
              className="flex items-center gap-2"
              onClick={() => setSelectedMenu("team")}
            >
              <Team />
              My Team
            </MenubarItem>
            <MenubarSeparator />
            <Input placeholder="Search people" />
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex gap-4 items-center justify-center">
        <Button
          className={`${
            selectedFilter === "all" ? "bg-[#d7dde6]" : "bg-transparent"
          } focus:bg-[#d7dde6] text-[#1e1e1e] hover:bg-[#d7dde6]`}
          onClick={() => setSelectedFilter("all")}
        >
          All
        </Button>
        <Button
          className={`${
            selectedFilter === "today" ? "bg-[#d7dde6]" : "bg-transparent"
          } focus:bg-[#d7dde6] text-[#1e1e1e] hover:bg-[#d7dde6]`}
          onClick={() => setSelectedFilter("today")}
        >
          Due Today
        </Button>
        <Button
          className={`${
            selectedFilter === "week" ? "bg-[#d7dde6]" : "bg-transparent"
          } focus:bg-[#d7dde6] text-[#1e1e1e] hover:bg-[#d7dde6]`}
          onClick={() => setSelectedFilter("week")}
        >
          Weekly
        </Button>
        <Button
          className={`${
            selectedFilter === "month" ? "bg-[#d7dde6]" : "bg-transparent"
          } focus:bg-[#d7dde6] text-[#1e1e1e] hover:bg-[#d7dde6]`}
          onClick={() => setSelectedFilter("month")}
        >
          Monthly
        </Button>
      </div>
    </div>
  );
}
