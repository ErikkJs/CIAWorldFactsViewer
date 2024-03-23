import  express from "express";
import countryRoutes from "./routes/countryRoutes.js"

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/cia-profile", countryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Open http://localhost:${PORT} in your browser.`);
});