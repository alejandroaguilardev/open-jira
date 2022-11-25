import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItem: string[] = ["Inbox", "Starred", "Send", "Email", "Drafts"];

export const Sidebar = () => {
	const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

	return (
		<Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
			<Box sx={{ width: 250 }}>
				<Box
					sx={{
						padding: "5px 10px",
					}}
				>
					<Typography variant="h4">Menú</Typography>
				</Box>

				<List>
					{menuItem.map((text, index) => (
						<ListItem button key={text}>
							{index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
							<ListItemText>{text}</ListItemText>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{menuItem.map((text, index) => (
						<ListItem button key={text}>
							{index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
							<ListItemText>{text}</ListItemText>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};
