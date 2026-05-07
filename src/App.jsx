import { useState } from 'react';
import Header from './components/layout/Header';
import ProjectDisplay from './components/projects/ProjectDisplay';
import HomePage from './components/home/HomePage';

function App() {
  const [currentProject, setCurrentProject] = useState('home');

  // If currentProject is 'home', show HomePage, else show ProjectDisplay
  const renderContent = () => {
    if (currentProject === 'home') {
      return <HomePage onProjectChange={setCurrentProject} />;
    }
    return <ProjectDisplay projectId={currentProject} />;
  };

  return (
    <div className="min-h-screen">
      <Header 
        currentProject={currentProject}
        onProjectChange={setCurrentProject}
      />
      <main className="main-container">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;