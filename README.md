# Resume Gap Analyzer

A minimalist, modern web application that analyzes a resume against a job description to identify missing skills, suggest improvements, and generate a 4-8 week learning roadmap.

## Project Overview

This tool uses AI to help job seekers tailor their resumes and prepare for specific roles. It takes two text inputs (a resume and a job description), processes them through OpenAI's language models, and outputs actionable insights, including:
- A match score (0-100)
- Missing skills
- Weak skills that need improvement
- Actionable suggestions
- A structured, week-by-week learning roadmap

## Tech Stack

This project is built using a strict, lightweight technology stack:

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS with minimal utility classes and `shadcn/ui` components
- **Backend:** Express API (Serverless approach)
- **Data Persistence:** None (No database, no ORM, all in-memory per request)
- **AI Integration:** OpenAI API via Replit AI Integrations

## How AI Analysis Works

When a user submits their resume and job description:
1. The frontend sends a `POST` request to the `/api/analyze` endpoint.
2. The server constructs a prompt instructing the AI to act as an expert career coach and technical recruiter.
3. The prompt is sent to the OpenAI model (`gpt-4o`) with instructions to return strictly formatted JSON.
4. The AI analyzes the texts to find gaps, provides recommendations, and generates a structured roadmap.
5. The JSON response is parsed, validated against our Zod schema, and returned to the client to be rendered cleanly.

## Setup Instructions

This project is configured to run instantly on Replit:

1. Click the **Run** button to start the application.
2. The `npm run dev` script will automatically start both the Express backend API and the Vite frontend server.
3. Because the OpenAI integration is already configured via Replit AI Integrations, no manual API key management is required.

*(If running locally, ensure you have an `.env` file with `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` properly set).*

## Security & Privacy

- **No Persistent Storage:** We do not use any database. Your resume and job description are processed in-memory and immediately discarded after the request completes.
- **Payload Limits:** The frontend and backend limit input sizes to ensure performance and prevent abuse.
- **API Key Security:** OpenAI API keys are securely managed through environment variables and are never exposed to the client.

## Future Improvements

- **PDF/Docx Uploads:** Allow users to directly upload their resume documents instead of copying and pasting text.
- **Export to PDF:** Allow users to download their personalized learning roadmap as a PDF.
- **Skill Deep-Dives:** Provide links to courses or resources for the specific missing skills identified.
- **Historical Tracking:** Add optional local storage support for users who want to track their progress across multiple applications without storing data on a server.
