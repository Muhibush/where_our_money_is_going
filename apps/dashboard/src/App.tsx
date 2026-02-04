import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import DashboardPage from './components/DashboardPage';
import HistoryPage from './components/HistoryPage';
import BudgetPage from './components/BudgetPage';
import SettingsPage from './components/SettingsPage';
import AddTransaction from './components/AddTransaction';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

type Tab = 'home' | 'history' | 'budget' | 'settings';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleTransactionSaved = () => {
    setShowAddTransaction(false);
    // TanStack Query automatically invalidates and refetches
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <DashboardPage />;
      case 'history':
        return <HistoryPage />;
      case 'budget':
        return <BudgetPage />;
      case 'settings':
        return <SettingsPage onLogout={logout} />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <LoginPage
          onNavigateToRegister={() => setAuthView('register')}
        />
      );
    }
    return (
      <RegisterPage
        onNavigateToLogin={() => setAuthView('login')}
      />
    );
  }

  return (
    <>
      <Layout currentTab={currentTab} onTabChange={setCurrentTab} onAddClick={() => setShowAddTransaction(true)}>
        {renderContent()}
      </Layout>
      {showAddTransaction && <AddTransaction onClose={() => setShowAddTransaction(false)} onSave={handleTransactionSaved} />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
