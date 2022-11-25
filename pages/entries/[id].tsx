import { ChangeEvent, useState, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import { IconButton } from "@mui/material";
import {
	capitalize,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { Entry, EntryStatus } from "../../interfaces";
import { Layouts } from "../../components/layouts";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
	entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
	const { updateEntry } = useContext(EntriesContext);

	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	);

	const onInputValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setInputValue(target.value);
	};

	const onStatusChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setStatus(target.value as EntryStatus);
	};

	const onSave = () => {
		if (inputValue.trim().length === 0) return;

		updateEntry(
			{
				...entry,
				description: inputValue,
				status,
			},
			true
		);
	};

	return (
		<Layouts title={inputValue.substring(0, 20) + "..."}>
			<Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entreda:    `}
							subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} minutos`}
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBorrom: 1 }}
								fullWidth
								placeholder="Nueva entrada"
								autoFocus
								multiline
								label="Nueva entrada"
								value={inputValue}
								onChange={onInputValueChange}
								onBlur={() => setTouched(true)}
								helperText={isNotValid && "Ingrese un Valor"}
								error={isNotValid}
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup row value={status} onChange={onStatusChanged}>
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlined />}
								variant="contained"
								fullWidth
								onClick={onSave}
								disabled={inputValue.length === 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<IconButton
				sx={{
					position: "fixed",
					bottom: 30,
					right: 30,
					backgroundColor: "error.dark",
				}}
			>
				<DeleteOutline />
			</IconButton>
		</Layouts>
	);
};

export default EntryPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			entry,
		},
	};
};
