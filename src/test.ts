import axios from "axios";

const doRequest = async () => {
	try {
		const response = await axios.get(
			"https://matrix-simplified.capturetheflags.site/search?s=flag{a",
			{
				headers: {
					Cookie: "session=eyJ1c2VybmFtZSI6Im5lbyJ9.ZyZV_A.ldFVdVWvyDjRfXUAt2MFLqs9lY0",
				},
			}
		);

		console.log(`🎅 Poi questo mesaggio di successo: ${response.status}`);
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(
				`👻 Poi questo messaggio di errore: ${error.response.data}`
			);
		}
	}
};

doRequest();
console.log("🎃 Prima viene stampato questo messaggio");
