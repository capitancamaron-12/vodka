import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy get Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Gemini AI Sommelier & Distillation Expert endpoint
app.post("/api/gemini/sommelier", async (req, res) => {
  try {
    const { message, history, mode, vodkaContext } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Return high quality fallback educational response if API key is not yet set
      return res.json({
        reply: `[Modo Educativo Offline] Como Master Sommelier y Químico Destilador, puedo explicarte que: "${message}". El vodka se define por su pureza (mínimo 96% ABV en la rectificación y diluido habitualmente al 40% ABV con agua pura de manantial o glaciar). Materias primas como el centeno aportan notas especiadas y pimienta blanca, el trigo de invierno brinda sedosidad y notas cítricas, mientras que la patata genera una untuosidad cremosa inigualable.`,
        thinking: "Análisis organoléptico y destilación basada en conocimiento maestro de destilería.",
      });
    }

    const systemPrompt = `Eres el Profesor y Master Sommelier Internacional de Destilados, especialista mundial en Vodka y Ciencia de la Destilación.
Tu objetivo es educar a alumnos y profesores en presentaciones académicas sobre el vodka.
Tus conocimientos abarcan:
1. Historia (Polonia s. VIII-XIV vs Rusia s. IX-XII, leyes de Iván el Terrible, monopolio zarista, Dmitry Mendeleev y la corrección del mito del 40%, Smirnoff y la diáspora posrevolucionaria).
2. Procesos de Fabricación (Fermentación de almidones/azúcares, rectificación continua en columnas Coffey y multi-torres a 96% ABV, filtración con carbón de abedul siberiano, arena de cuarzo y plata coloidal, desmineralización de agua).
3. Catas Sensoriales (Limpidez, densidad, viscosidad / lágrimas, notas primarias de cereal/tubérculo, notas secundarias de fermentación, sensación táctil en paladar, balance alcohólico, retrogusto).
4. Coctelería de Clase Mundial (Martini clásico, proporciones, Moscow Mule y química del cobre, temperatura criogénica).

Responde siempre en un tono erudito pero didáctico, apasionado, visual y claro para exposiciones de clase. Si el usuario pide un formato para Blogger o clase, dale títulos llamativos, subtítulos claros, listas y citas destacadas.
${vodkaContext ? `Contexto del Vodka seleccionado: ${JSON.stringify(vodkaContext)}` : ""}`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text || h.content }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        thinkingConfig: {
          thinkingLevel: mode === "deep" ? ThinkingLevel.HIGH : ThinkingLevel.LOW,
        },
      },
    });

    const reply = response.text || "No se pudo generar la respuesta.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Sommelier API Error:", error);
    res.status(500).json({
      error: error.message || "Error al consultar al Sommelier IA",
      reply: "Hubo un inconveniente al consultar al sommelier en este momento. Recuerda los 3 pilares del vodka: Pureza de Rectificación (96%), Calidad del Agua de Dilución y Carácter de la Materia Prima.",
    });
  }
});

// Gemini Custom Article / Blogger Generator endpoint
app.post("/api/gemini/generate-article", async (req, res) => {
  try {
    const { topic, focus, audience, format } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        html: `<h2>${topic || "El Secreto del Vodka"}</h2><p>El vodka representa la cúspide de la destilación de precisión...</p>`,
        markdown: `## ${topic || "El Secreto del Vodka"}\n\nEl vodka representa la cúspide de la destilación de precisión...`,
      });
    }

    const prompt = `Genera una entrada de blog completa y lista para publicar (en formato Blogger / HTML limpio con clases Tailwind o estilos inline elegantes, y también en Markdown) sobre el siguiente tema de Vodka:
Tema: "${topic}"
Enfoque: "${focus || "Cata sensorial, Historia y Proceso de Fabricación para clase académica"}"
Público objetivo: "${audience || "Estudiantes universitarios de gastronomía/química/cultura gastronómica"}"
Formato solicitado: "${format || "Entrada de Blog enriquecida con infografías textuales, datos curiosos, ficha de cata y resumen ejecutivo"}".

Estructura requerida:
1. Título impactante para blog / presentación.
2. Introducción atrapante con contexto histórico o sensorial.
3. Secciones detalladas con subtítulos H2 y H3.
4. Cuadro comparativo / tabla de datos clave.
5. Ficha técnica de cata recomendada.
6. Conclusión y preguntas de debate para la clase.

Responde ÚNICAMENTE en formato JSON con la siguiente estructura:
{
  "title": "Título del artículo",
  "excerpt": "Breve resumen de 2 líneas para el encabezado",
  "html": "<div class='blogger-post'>...contenido en HTML semántico listo para pegar en Blogger...</div>",
  "markdown": "# Título\\n\\n...contenido en Markdown...",
  "keyTakeaways": ["Punto clave 1", "Punto clave 2", "Punto clave 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Generate Article Error:", error);
    res.status(500).json({
      error: error.message || "Error al generar la entrada de blog",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use("/vodka", express.static(distPath));
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vodka Mastery server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
