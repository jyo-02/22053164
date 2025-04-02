import express from "express";
import axios from "axios";

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numberWindow = [];

const APIs = {
  p: "http://20.244.56.144/evaluation-service/primes",
  f: "http://20.244.56.144/evaluation-service/fibo",
  e: "http://20.244.56.144/evaluation-service/even",
};

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0NzczLCJpYXQiOjE3NDM2MDQ0NzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImMxZGRjNmU2LWU2YTYtNGZiYS1iYjhiLTZjMzFjMWE0MDkwZCIsInN1YiI6IjIyMDUzMTY0QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MzE2NEBraWl0LmFjLmluIiwibmFtZSI6Imp5b3Rpc2thIGJvc2UiLCJyb2xsTm8iOiIyMjA1MzE2NCIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6ImMxZGRjNmU2LWU2YTYtNGZiYS1iYjhiLTZjMzFjMWE0MDkwZCIsImNsaWVudFNlY3JldCI6IkdjZWdNaGpwbnVjREp6aGQifQ.y9Z3zhFa7YsVY36YgB5_e-5j-DABWvhOnvJfaA5VxjM";

async function fetchNumbers(type) {
  try {
    const source = axios.CancelToken.source();
    setTimeout(() => source.cancel(), 500);

    const response = await axios.get(APIs[type], {
      headers: {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json"
      },
      cancelToken: source.token
    });

    return response.data.numbers || [];
  } catch (error) {
    console.error("Error fetching numbers:", error.message);
    return [];
  }
}

app.get("/", (req, res) => {
  res.send("Average Calculator Microservice is Running!");
});

app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  if (!APIs[numberid]) return res.status(400).json({ error: "Invalid number ID" });

  const prevState = [...numberWindow];
  const newNumbers = await fetchNumbers(numberid);

  newNumbers.forEach(num => {
    if (!numberWindow.includes(num)) numberWindow.push(num);
  });

  while (numberWindow.length > WINDOW_SIZE) numberWindow.shift();

  const avg = numberWindow.length ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length) : 0;

  res.json({
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers: newNumbers,
    avg: avg.toFixed(2)
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
