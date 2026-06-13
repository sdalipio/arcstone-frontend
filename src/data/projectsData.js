export const projectsData = {
    budget: {
      id: 'budget',
      title: 'Budget Tracker',
      description: 'A full-stack expense tracking application with real-time balance calculation. Track your income and expenses with an intuitive interface.',
      techStack: ['React', '.NET 8', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
      github: 'https://github.com/sdalipio/budget-tracker-frontend',
      liveDemo: 'https://budget-tracker-roan-pi.vercel.app/',
      features: [
        'Add and delete transactions',
        'Real-time balance calculation',
        'Income/Expense categorization',
        'Local storage persistence',
        'Responsive design'
      ],
      status: 'completed'
    },
    studyguide: {
      id: 'studyguide',
      title: 'Study Guide AI',
      description: 'An AI-powered learning platform that turns your PDFs and Word documents into topic-based study tools — chat with your documents, summaries, flashcards, and quizzes — powered by a RAG pipeline.',
      techStack: ['React', 'Vite', 'FastAPI', 'LangChain', 'Groq (Llama 3.3)', 'PostgreSQL', 'pgvector'],
      github: 'https://github.com/sdalipio/studyguide',
      liveDemo: null,
      features: [
        'PDF & Word upload with automatic topic segmentation',
        'Chat with your document — streaming RAG answers with citations',
        'AI-generated summaries per topic',
        'Interactive 3D flashcards (shuffle + generate more)',
        'Scored quizzes with a growing question bank',
      ],
      status: 'completed'
    },
  };
