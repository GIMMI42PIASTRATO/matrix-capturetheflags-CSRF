import express from "express";

const app = express();
const PORT = 3000;

/* 
1. Inviare all'architetto un URL di un sito creato da te e hostato pubblicamente.

2. L'architetto farà una post request al URL che gli abbiamo inviato

3. Nell nostro server nel route post("/") faremo partire un side effect che fa a sua volta una richiesta a https://matrix.capturetheflags.site/search cercando flag{<lettera maiuscola o minuscola o carattere speciale>
Le lettere che dobbiamo inserire devono seguire questa regex ^flag\{[a-zA-Z0-9!_]+\}$

4. Se il sito quindi risponde 404 significa che il carattere che abbiamo inserito non si trova nella flag, se risponde 200 significa che il carattere si trova nella flag
*/

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/", (req, res) => {
	console.log("This request was made by the Architect 🧑‍💼!");

	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
