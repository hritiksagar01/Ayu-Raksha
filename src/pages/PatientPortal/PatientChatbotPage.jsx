import React, { useState, useEffect, useRef } from 'react';
import { callGeminiAPI } from '../../api/geminiAPI';
import MicIcon from '../../components/icons/MicIcon';
import SendIcon from '../../components/icons/SendIcon';

const PatientChatbotPage = ({ translations, selectedLanguage }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const chatEndRef = useRef(null);
    const conversationHistory = useRef([]);

    useEffect(() => {
        const welcomeMessage = { id: 1, text: translations.aiWelcomeMessage[selectedLanguage], sender: 'ai' };
        setMessages([welcomeMessage]);
        conversationHistory.current = [{ role: 'model', parts: [{ text: welcomeMessage.text }] }];
    }, [selectedLanguage, translations.aiWelcomeMessage]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isAiTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isAiTyping) return;

        const userMessageText = inputValue;
        const userMessage = { id: Date.now(), text: userMessageText, sender: 'user' };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsAiTyping(true);

        conversationHistory.current.push({ role: 'user', parts: [{ text: userMessageText }] });

        const systemPrompt = "You are Ayu-Raksha, a friendly and helpful AI health assistant. Your goal is to provide general health information and guidance. You must always advise users to consult a real medical professional for diagnoses or serious concerns. Keep your answers empathetic and easy to understand in the user's language. Your knowledge is based on information up to early 2023. You are not a doctor.";
        const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationHistory.current.map(m => `${m.role}: ${m.parts[0].text}`).join('\n')}\n\nNew User Message: ${userMessageText}`;

        const aiResponseText = await callGeminiAPI(fullPrompt);

        const aiResponseMessage = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
        setMessages(prev => [...prev, aiResponseMessage]);
        setIsAiTyping(false);
        conversationHistory.current.push({ role: 'model', parts: [{ text: aiResponseText }] });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 bg-white"> <h1 className="text-3xl font-bold text-gray-800">{translations.chatbotTitle[selectedLanguage]}</h1> </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4">
                {messages.map(message => (<div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}> <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}><p>{message.text}</p></div> </div>))}
                {isAiTyping && (<div className="flex justify-start"><div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-200 text-gray-500 italic">{translations.aiTyping[selectedLanguage]}</div></div>)}
                <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={translations.chatbotPlaceholder[selectedLanguage]} className="flex-1 w-full px-4 py-2 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <button type="button" className="p-2 text-gray-500 hover:text-teal-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"> <MicIcon className="h-6 w-6" /> </button>
                    <button type="submit" disabled={isAiTyping} className="p-3 text-white bg-teal-500 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-300"> <SendIcon className="h-6 w-6" /> </button>
                </form>
            </div>
        </div>
    );
};

export default PatientChatbotPage;