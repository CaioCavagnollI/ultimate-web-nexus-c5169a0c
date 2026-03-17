import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import FeedPage from "./pages/FeedPage";
import AIMentorPage from "./pages/AIMentorPage";
import ChatPage from "./pages/ChatPage";
import ScannerPage from "./pages/ScannerPage";
import AnamnesePage from "./pages/AnamnesePage";
import PrescriptionPage from "./pages/PrescriptionPage";
import NexusPremiumPage from "./pages/NexusPremiumPage";
import TrainingProPage from "./pages/TrainingProPage";
import EditorialProPage from "./pages/EditorialProPage";
import NutriProPage from "./pages/NutriProPage";
import CoachProPage from "./pages/CoachProPage";
import NexusLabPage from "./pages/NexusLabPage";
import AcademicPage from "./pages/AcademicPage";
import LibraryPage from "./pages/LibraryPage";
import StorePage from "./pages/StorePage";
import TrainingProgramsPage from "./pages/TrainingProgramsPage";
import ForumPage from "./pages/ForumPage";
import UploadsPage from "./pages/UploadsPage";
import AffiliatesPage from "./pages/AffiliatesPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";
import AdminPage from "./pages/AdminPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />

          {/* Protected routes with sidebar layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/ai-mentor" element={<AIMentorPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/anamnese" element={<AnamnesePage />} />
            <Route path="/prescricao" element={<PrescriptionPage />} />
            <Route path="/premium" element={<NexusPremiumPage />} />
            <Route path="/treinamento-pro" element={<TrainingProPage />} />
            <Route path="/editorial-pro" element={<EditorialProPage />} />
            <Route path="/nutricao-pro" element={<NutriProPage />} />
            <Route path="/coach-pro" element={<CoachProPage />} />
            <Route path="/lab" element={<NexusLabPage />} />
            <Route path="/academico" element={<AcademicPage />} />
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/loja" element={<StorePage />} />
            <Route path="/programas" element={<TrainingProgramsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/uploads" element={<UploadsPage />} />
            <Route path="/afiliados" element={<AffiliatesPage />} />
            <Route path="/integracoes" element={<IntegrationsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
