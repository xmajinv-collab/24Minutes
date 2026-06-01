import OpenAI from "openai";

const openai =
  new OpenAI({

    apiKey:
      process.env.GROQ_API_KEY,

    baseURL:
      "https://api.groq.com/openai/v1",

  });

export async function POST(
  req: Request
) {

  try {

    const {
      query,
      favorites,
      recent,
    } =
      await req.json();

    const completion =
      await openai.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",

            content:
              `
              Eres un experto en anime.

              Usa favoritos e historial para recomendar anime.

              FAVORITOS:
              ${favorites?.join(", ")}

              RECIENTES:
              ${recent?.join(", ")}

              Responde SOLO con nombres de anime separados por coma.

              Máximo 5 recomendaciones.
              `,
          },

          {
            role: "user",

            content: query,
          },
        ],

      });

    return Response.json({

      result:
        completion.choices[0]
          .message.content,

    });

  } catch (error) {

    return Response.json(
      {
        error:
          "AI Error",
      },
      {
        status: 500,
      }
    );

  }

}