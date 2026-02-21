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

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS with `shadcn/ui` components
- **Backend:** Express API
- **Data Persistence:** None (No database, all in-memory per request)
- **AI Integration:** Groq API with `meta-llama/llama-4-scout-17b-16e-instruct`

## How AI Analysis Works

When a user submits their resume and job description:
1. The frontend sends a `POST` request to the `/api/analyze` endpoint.
2. The server constructs a prompt instructing the AI to act as an expert career coach and technical recruiter.
3. The prompt is sent to the Groq model with instructions to return strictly formatted JSON.
4. The AI analyzes the texts to find gaps, provides recommendations, and generates a structured roadmap.
5. The JSON response is parsed, validated against a Zod schema, and returned to the client.

## Setup Instructions

1. Clone the repository:
```bash
   git clone https://github.com/SaurabhVerma-007/Resume-Gap-Insight.git
   cd Resume-Gap-Insight
```

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

## Deployment

This app is deployed on [Render](https://render.com). To deploy your own instance:

1. Connect your GitHub repo to Render
2. Set **Build Command:** `npm install && npm run build`
3. Set **Start Command:** `npm start`
4. Add environment variable `GROQ_API_KEY`

## Security & Privacy

- **No Persistent Storage:** Your resume and job description are processed in-memory and immediately discarded after the request completes.
- **Payload Limits:** Input sizes are limited on both frontend and backend to ensure performance and prevent abuse.
- **API Key Security:** Groq API keys are managed through environment variables and are never exposed to the client.

## Future Improvements

- **PDF/Docx Uploads:** Allow users to directly upload resume documents instead of pasting text.
- **Export to PDF:** Allow users to download their personalized learning roadmap as a PDF.
- **Skill Deep-Dives:** Provide links to courses or resources for specific missing skills.
- **Historical Tracking:** Add optional local storage to track progress across multiple applications.