import { UIState } from "./UIProvider";

type UIActionType =
	| { type: "UI - Open Sidebar" }
	| { type: "UI - Close Sidebar" }
	| { type: "UI - [Entry] Adding"; payload: boolean }
	| { type: "UI - Start Dragging" }
	| { type: "UI - End Dragging" };

export const uiReducer = (state: UIState, action: UIActionType) => {
	switch (action.type) {
		case "UI - [Entry] Adding":
			return {
				...state,
				isAdding: action.payload,
			};
		case "UI - Start Dragging":
			return {
				...state,
				isDragging: true,
			};

		case "UI - End Dragging":
			return {
				...state,
				isDragging: false,
			};
		case "UI - Open Sidebar":
			return {
				...state,
				sidemenuOpen: true,
			};

		case "UI - Close Sidebar":
			return {
				...state,
				sidemenuOpen: false,
			};
		default:
			return {
				...state,
			};
	}
};
