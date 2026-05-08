import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function predictSalesTrends(historicalSales: any[]) {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Analyze the following pharmacy sales data and predict the trend for the next 7 days.
    Data: ${JSON.stringify(historicalSales)}
    
    Provide a concise summary including:
    1. Expected growth/decline percentage.
    2. Hot products to restock.
    3. Potential low-demand items.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Sales Prediction Error:", error);
    return "Unable to generate prediction at this time.";
  }
}

export async function getMedicineInsights(medicineData: any) {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Analyze this medicine: ${medicineData.name} (${medicineData.genericName}).
    Provide practical insights for a pharmacist regarding:
    1. Common side effects to warn customers about.
    2. Storage best practices.
    3. Potential interaction warnings with common OTC drugs.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Medicine Insight Error:", error);
    return "No insights available.";
  }
}
