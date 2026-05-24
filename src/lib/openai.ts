export async function analyzeMedicine(medicineName: string) {
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a professional medical assistant that analyzes medicines and explains them clearly.",
          },
          {
            role: "user",
            content: `Analyze this medicine: ${medicineName}. Include active ingredient, pharmaceutical form, administration route, warnings, conservation advice and effectiveness.`,
          },
        ],
      }),
    }
  );

  return response.json();
}