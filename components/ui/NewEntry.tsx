import { ChangeEvent, useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { AddCircleOutlineOutlined, SaveAltOutlined } from "@mui/icons-material";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
	const { addNewEntry } = useContext(EntriesContext);
	const { isAdding, setIsAddingEntry } = useContext(UIContext);

	const [inputValue, setInputValue] = useState("");
	const [touched, setTouched] = useState(false);

	const onFieldChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setInputValue(target.value);
	};

	const onSave = () => {
		if (inputValue.length === 0) return;
		addNewEntry(inputValue);
		setInputValue("");
		setTouched(false);
		setIsAddingEntry(false);
	};

	return (
		<Box
			sx={{
				marginBottom: 2,
				paddingX: 1,
			}}
		>
			{isAdding ? (
				<>
					<TextField
						fullWidth
						sx={{
							marginTop: 2,
							marginBottom: 1,
						}}
						placeholder="Nueva Entrada"
						autoFocus
						multiline
						label="Nueva Entrada"
						helperText={touched && inputValue.length == 0 && "Ingrese un valor"}
						error={touched && inputValue.length == 0}
						value={inputValue}
						onChange={onFieldChange}
						onBlur={() => setTouched(true)}
					/>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" onClick={() => setIsAddingEntry(false)}>
							Cancelar
						</Button>

						<Button
							variant="outlined"
							color="secondary"
							endIcon={<SaveAltOutlined />}
							onClick={onSave}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					fullWidth
					variant="outlined"
					startIcon={<AddCircleOutlineOutlined />}
					onClick={() => setIsAddingEntry(true)}
				></Button>
			)}
		</Box>
	);
};
