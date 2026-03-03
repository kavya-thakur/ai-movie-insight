// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const imdbId = searchParams.get("imdbId");

//     if (!imdbId) {
//       return Response.json({ error: "IMDb ID is required" }, { status: 400 });
//     }

//     // 🎬 Fetch movie data
//     const movieRes = await fetch(
//       `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
//     );

//     const movie = await movieRes.json();

//     if (movie.Response === "False") {
//       return Response.json({ error: movie.Error }, { status: 404 });
//     }

//     // 🤖 AI PROMPT
//     const prompt = `
// You are an AI that analyzes audience sentiment for movies.

// Based on this movie data:

// Title: ${movie.Title}
// Plot: ${movie.Plot}
// IMDb Rating: ${movie.imdbRating}

// Give:
// 1. A 2-3 line audience sentiment summary
// 2. Overall sentiment: Positive, Mixed, or Negative

// Respond in JSON format like:
// {
//   "summary": "...",
//   "sentiment": "Positive"
// }
// `;

//     // 🤖 Groq AI call
//     const aiResponse = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const aiText = aiResponse.choices[0]?.message?.content || "";

//     let aiSummary = "No summary available";
//     let sentiment = "Mixed";

//     try {
//       const parsed = JSON.parse(aiText);
//       aiSummary = parsed.summary;
//       sentiment = parsed.sentiment;
//     } catch {
//       aiSummary = aiText;
//     }

//     return Response.json({
//       movie,
//       aiSummary,
//       sentiment,
//     });
//   } catch (error) {
//     console.log(error);
//     return Response.json({ error: "Server error" }, { status: 500 });
//   }
// }

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const imdbId = searchParams.get("imdbId");

    if (!imdbId) {
      return Response.json({ error: "IMDb ID is required" }, { status: 400 });
    }

    // 1. Fetch Movie Data
    const movieRes = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
    );
    const movie = await movieRes.json();

    if (movie.Response === "False") {
      return Response.json({ error: movie.Error }, { status: 404 });
    }

    // 2. Structured Prompt for High-Quality Output
    const prompt = `Analyze the audience sentiment for the movie: "${movie.Title}".
    Plot: ${movie.Plot}
    IMDb Rating: ${movie.imdbRating}
    
    Return a JSON object with exactly these keys:
    "summary": A sophisticated 2-line editorial summary.
    "sentiment": Exactly one of "Positive", "Mixed", or "Negative".`;

    // 3. Groq Call with JSON Mode enabled
    const aiResponse = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }, // Forces valid JSON
      temperature: 0.5, // Keeps responses stable/professional
    });

    const aiContent = aiResponse.choices[0]?.message?.content;

    // 4. Robust Parsing
    let aiData = { summary: "Analysis unavailable.", sentiment: "Mixed" };
    try {
      aiData = JSON.parse(aiContent);
    } catch (parseError) {
      console.error("AI JSON Parse Error:", parseError);
    }

    return Response.json({
      movie, // This contains movie.imdbRating for your UI
      aiSummary: aiData.summary,
      sentiment: aiData.sentiment,
    });
  } catch (error) {
    console.error("Route Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
