import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry } from "../../../../models";
import { IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		res.status(400).json({ message: "Id no es valdo" + id });
	}

	switch (req.method) {
		case "GET":
			return recordEntries(req, res);
		case "PUT":
			return updateEntries(req, res);
		case "DELETE":
			return deleteEntries(req, res);
		default:
			return res.status(400).json({ message: "endpoint no existe" });
	}
}

const recordEntries = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;

	await db.connect();
	const entry = await Entry.findById(id);
	await db.disconnect();

	return res.status(200).json(entry!);
};

const updateEntries = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;

	await db.connect();
	const entryToUpdate = await Entry.findById(id);

	if (!entryToUpdate) {
		await db.disconnect();
		return res.status(400).json({ message: "ID no existe" });
	}

	const {
		description = entryToUpdate.description,
		status = entryToUpdate.status,
	} = req.body;

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{
				description,
				status,
			},
			{ runValidators: true, new: true }
		);

		await db.disconnect();
		return res.status(200).json(updatedEntry!);
	} catch (error) {
		console.log(error);
		await db.disconnect();
		return res
			.status(400)
			.json({ message: "Algo salio mal, no se pudo actualizar" });
	}

	// entryToUpdate.description =description;
	// entryToUpdate.description =status;
	// await entryToUpdate.save();
};

const deleteEntries = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	try {
		await db.connect();
		await db.disconnect();
		return res.status(201).json({ message: "" });
	} catch (error: any) {
		return res.status(400).json({ message: error.erros.status.message });
	}
};
