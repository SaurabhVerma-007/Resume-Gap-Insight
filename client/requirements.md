## Packages
framer-motion | For subtle entry animations and layout transitions
lucide-react | Beautiful icons for the UI
clsx | Conditional class merging
tailwind-merge | Utility for merging tailwind classes

## Notes
The backend provides a single endpoint `POST /api/analyze` which takes `resume` and `jobDescription`.
The response includes `matchScore`, `missingSkills`, `weakSkills`, `improvementSuggestions`, and `learningRoadmap`.
We need to display these results in a clean, card-based layout.
Using a light, minimal theme with blue/indigo accents for a professional look.
