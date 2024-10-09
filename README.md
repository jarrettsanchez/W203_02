
# Software Practice Empirical Evidence Database (SPEED)

**SPEED** is an academic project under **Contemporary Issues in Software Engineering**, aimed at providing a web-based platform for easy access to empirical evidence on software engineering (SE) practices. It supports evidence-based decision-making by compiling research studies and presenting them in a user-friendly format. This platform simplifies access to research, helping practitioners, researchers, and students bypass paywalls and avoid complex academic language.

## Key Features
- **Searchable Database**: Users can search SE practices and claims, and view summaries of evidence (whether the study agrees or disagrees with the claim) derived from published research.
- **Article Submission**: Public users can suggest studies for inclusion by submitting bibliographic details (no PDFs). SERC staff will moderate and analyse these submissions.
- **User Ratings**: Users can rate articles (1-5 stars) and save search queries for future reference.

## Workflow
- **Submitters**: Users submit bibliographic information (e.g. title, authors, DOI) via an online form.
- **Moderators**: SERC staff review article submissions for relevance and quality.
- **Analysts**: Approved articles are analysed, and key evidence is extracted and entered into the SPEED database.

## Tech Stack
- **NEXT.js** is the core technology for the SPEED platform, ensuring compatibility with in-house developer expertise and future maintenance.
- **Cross-Device Accessibility**: SPEED is available as a web app, ensuring usability across various devices.

## Project Constraints
- **Copyright Restrictions**: Full articles cannot be linked or provided. Only metadata, such as DOI, will be available.
- **Limited Initial Functionality**: The first release will focus on core features, with plans for future enhancements.
- **Communication**: Collaboration with the Product Owner (PO) will be conducted with limited face-to-face meetings, and team members mainly MS Teams.

## Future Goals
- **AI Integration**: Automating the extraction of article information to assist analysts.
- **Chatbot Assistance**: Implementing a chatbot for better user experience in querying the database.
- **Enhanced Visualisation**: Offering new ways of displaying results, such as card views and additional filtering options.

## Installation & Usage
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the project locally using `npm run dev`.
-----
**SPEED** empowers SE practitioners to make informed decisions based on evidence, providing a streamlined solution to access research that is often locked behind paywalls or is difficult to interpret due to academic complexity.
