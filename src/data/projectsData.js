export const projectsData = {
    budget: {
      id: 'budget',
      title: 'Budget Tracker',
      description: 'A full-stack expense tracking application with real-time balance calculation. Track your income and expenses with an intuitive interface.',
      techStack: ['React', '.NET 8', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
      github: 'https://github.com/yourusername/budget-tracker',
      liveDemo: 'https://your-demo-link.com',
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
    taskmanager: {
      id: 'taskmanager',
      title: 'Task Manager',
      description: 'A collaborative task management system with drag-and-drop functionality and team features.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'DnD Kit'],
      github: 'https://github.com/yourusername/task-manager',
      liveDemo: null,
      features: [
        'Drag-and-drop task board',
        'Real-time updates',
        'Team collaboration',
        'Task deadlines and priorities'
      ],
      status: 'in-progress'
    },
    analytics: {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Interactive data visualization dashboard with custom charts and real-time data filtering.',
      techStack: ['React', 'D3.js', 'Chart.js', 'Python', 'FastAPI'],
      github: 'https://github.com/yourusername/analytics-dash',
      liveDemo: null,
      features: [
        'Interactive charts and graphs',
        'Data export functionality',
        'Custom date ranges',
        'Multiple visualization types'
      ],
      status: 'planned'
    }
  };