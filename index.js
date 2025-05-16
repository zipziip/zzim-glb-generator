import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.post("/generate", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const response = await axios.post(
      "https://web.lumalabs.ai/api/models",
      {
        prompt: "Real estate 3D tour, extremely lightweight",
        image_url: imageUrl,
        duration: "5s",
        quality: "low"
      },
      {
        headers: {
          Authorization: "Bearer luma-493eaa8a-4a0d-4d63-bbf3-2acad14a9c2b-15effffa-c881-4306-bdb2-69738962e09f",
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ glbUrl: response.data.result_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
