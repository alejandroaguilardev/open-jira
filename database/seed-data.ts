interface Entry{
    entries:SeedEntry[];
}

interface SeedEntry {
    description:string;
    status:string;
    createdAt:number;
}

export const seedData:Entry = {
	entries: [
		{
			description:
				"Pending: Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tempore optio rerum? Suscipit provident pariatur vero. Fugiat quo quos illum obcaecati soluta assumenda magni. Consectetur, nesciunt consequuntur? Deleniti, cumque tempora!",
			status: "pending",
			createdAt: Date.now(),
		},
		{
			description:
				"Progress: Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tempore optio rerum? Suscipit provident pariatur vero. Fugiat quo quos illum obcaecati soluta assumenda magni. Consectetur, nesciunt consequuntur? Deleniti, cumque tempora!",
			status: "in-progress",
			createdAt: Date.now() - 100000,
		},
		{
			description:
				"finished:Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tempore optio rerum? Suscipit provident pariatur vero. Fugiat quo quos illum obcaecati soluta assumenda magni. Consectetur, nesciunt consequuntur? Deleniti, cumque tempora!",
			status: "finished",
			createdAt: Date.now() - 1000000,
		},
	],
};
