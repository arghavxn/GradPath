import React, { useState } from "react";

const AIAssistantPanel = ({
  gpa = 0,
  graduationDate = "TBD",
  nextAvailableCourses = [],
  remainingCourses = [],
  categoryProgress = []
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m your GradPath AI advisor. Ask me about your progress, graduation timeline, remaining requirements, or what to take next."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Am I on track to graduate?",
    "What should I take next semester?",
    "What requirements am I still missing?",
    "Why are these courses recommended?"
  ];

  const sendMessage = async (questionText = input) => {
    const trimmed = questionText.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai-guidance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: trimmed,
          chatHistory: updatedMessages,
          gpa,
          graduationDate,
          remainingCourses,
          nextAvailableCourses,
          categoryProgress
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.answer || "I could not generate a response right now."
        }
      ]);
    } catch (error) {
      console.error("AI chat error:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong while contacting the AI service."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="card mb-8 hover:shadow-md transition-all">
      <div className="card-header bg-amber-50 border-b border-amber-100">
        <h3 className="text-xl font-bold text-amber-700">AI Academic Guidance</h3>
        <p className="text-sm text-amber-600">
          Chat with an AI advisor about your academic progress and next steps
        </p>
      </div>

      <div className="p-6">
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
          <div className="h-[420px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-80">
                    {message.role === "user" ? "You" : "GradPath AI"}
                  </div>
                  <div className="leading-7 whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm bg-white text-gray-800 border border-gray-200">
                  <div className="text-xs font-semibold mb-1 opacity-80">GradPath AI</div>
                  <div className="leading-7">Thinking...</div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => sendMessage(question)}
                  disabled={loading}
                  className="px-3 py-2 text-sm rounded-full border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your graduation progress, next classes, or missing requirements..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-3 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;