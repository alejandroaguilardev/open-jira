import { createContext } from "react";

interface ContextProps {
	sidemenuOpen: boolean;
	isAdding: boolean;
	isDragging: boolean;
	setIsAddingEntry: (toggle: boolean) => void;
	openSideMenu: () => void;
	closeSideMenu: () => void;
	startDragging: () => void;
	endDragging: () => void;
}
export const UIContext = createContext({} as ContextProps);
