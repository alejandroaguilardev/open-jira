import { Entry } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

type EntriesActionType =
	| {
			type: "[Entry] Refresh-Data";
			payload: Entry[];
	  }
	| {
			type: "[Entry] Add-Entry";
			payload: Entry;
	  }
	| {
			type: "[Entry] Update-Entry";
			payload: Entry;
	  };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
) => {
	switch (action.type) {
		case "[Entry] Refresh-Data":
			return {
				...state,
				entries: [...action.payload],
			};
		case "[Entry] Add-Entry":
			return {
				...state,
				entries: [...state.entries, action.payload],
			};

		case "[Entry] Update-Entry":
			return {
				...state,
				entries: state.entries.map((entry) =>
					entry._id === action.payload._id ? action.payload : entry
				),
			};
		default:
			return state;
	}
};
