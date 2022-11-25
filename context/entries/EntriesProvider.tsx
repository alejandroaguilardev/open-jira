import { FC, ReactNode, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext } from "./EntriesContext";
import { entriesReducer } from "./entriesReducer";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";

interface Props {
	children: ReactNode;
}

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>("/entries", { description });
		dispatch({
			type: "[Entry] Add-Entry",
			payload: data,
		});
	};

	const updateEntry = async (entry: Entry, showSnackbar = false) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
				description: entry.description,
				status: entry.status,
			});

			if (showSnackbar)
				enqueueSnackbar("Entrada Actualizada", {
					variant: "success",
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});

			dispatch({
				type: "[Entry] Update-Entry",
				payload: data,
			});
		} catch (error) {}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>("/entries");
		dispatch({
			type: "[Entry] Refresh-Data",
			payload: data,
		});
	};

	useEffect(() => {
		refreshEntries();
	}, []);

	return (
		<EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};
