# Resume Gap Analyzer

A minimalist, modern web application that analyzes a resume against a job description to identify missing skills, suggest improvements, and generate a 4-8 week learning roadmap.

## Project Overview

This tool uses AI to help job seekers tailor their resumes and prepare for specific roles. It takes two text inputs (a resume and a job description), processes them through Groq's language models, and outputs actionable insights, including:
- A match score (0-100)
- Missing skills
- Weak skills that need improvement
- Actionable suggestions
- A structured, week-by-week learning roadmap

## Tech Stack

This project is built using a strict, lightweight technology stack:

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS with minimal utility classes and `shadcn/ui` components
- **Backend:** Express API
- **Data Persistence:** None (No database, no ORM, all in-memory per request)
- **AI Integration:** Groq API with `meta-llama/llama-4-scout-17b-16e-instruct`

## How AI Analysis Works

When a user submits their resume and job description:
1. The frontend sends a `POST` request to the `/api/analyze` endpoint.
2. The server constructs a prompt instructing the AI to act as an expert career coach and technical recruiter.
3. The prompt is sent to the Groq model (`llama-4-scout-17b-16e-instruct`) with instructions to return strictly formatted JSON.
4. The AI analyzes the texts to find gaps, provides recommendations, and generates a structured roadmap.
5. The JSON response is parsed, validated against our Zod schema, and returned to the client to be rendered cleanly.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the root of the project:
```env
   GROQ_API_KEY=your_groq_api_key_here
```
4. Run the development server:
```bash
   npm run dev
```
5. Open your browser at `http://localhost:5000`

> Get your free Groq API key at [console.groq.com](https://console.groq.com)

## Security & Privacy

- **No Persistent Storage:** We do not use any database. Your resume and job description are processed in-memory and immediately discarded after the request completes.
- **Payload Limits:** The frontend and backend limit input sizes to ensure performance and prevent abuse.
- **API Key Security:** Groq API keys are securely managed through environment variables and are never exposed to the client.

## Future Improvements

- **PDF/Docx Uploads:** Allow users to directly upload their resume documents instead of copying and pasting text.
- **Export to PDF:** Allow users to download their personalized learning roadmap as a PDF.
- **Skill Deep-Dives:** Provide links to courses or resources for the specific missing skills identified.
- **Historical Tracking:** Add optional local storage support for users who want to track their progress across multiple applications without storing data on a server.