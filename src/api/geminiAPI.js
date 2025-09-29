// A reusable function to call the Gemini API with exponential backoff for retries.
export const callGeminiAPI = async (prompt, maxRetries = 3) => {
    const apiKey = ""; // This will be handled by the execution environment.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      safetySettings: [ // Add safety settings to reduce chances of getting blocked responses
          { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
          { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
          { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
          { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
      ]
    };
  
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content?.parts?.[0]?.text) {
          return result.candidates[0].content.parts[0].text;
        } else {
          // Handle cases where the response is valid but empty (e.g., safety block)
          return "I'm sorry, I couldn't generate a response for that. Could you try rephrasing your question?";
        }
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error("Gemini API call failed after multiple retries:", error);
          return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
        }
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };