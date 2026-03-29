import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

import PublicLayout from "./components/PublicLayout";
import Layout from "./components/Layout";

// Public pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/public/AboutPage";
import SciencePage from "./pages/public/SciencePage";
import MethodsPage from "./pages/public/MethodsPage";
import ResearchPage from "./pages/public/ResearchPage";
import PlansPage from "./pages/public/PlansPage";
import FAQPage from "./pages/public/FAQPage";
import EnterprisePage from "./pages/public/EnterprisePage";
import BusinessPublicPage from "./pages/public/BusinessPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

// Core app
import DashboardPage from "./pages/DashboardPage";
import TodayPage from "./pages/TodayPage";
import OnboardingPage from "./pages/OnboardingPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import PricingPage from "./pages/PricingPage";

// Atlas IA
import AtlasHubPage from "./pages/atlas/AtlasHubPage";
import AtlasChatPage from "./pages/atlas/AtlasChatPage";
import AtlasAssistantPage from "./pages/atlas/AtlasAssistantPage";
import AtlasExplainPage from "./pages/atlas/AtlasExplainPage";
import AtlasMentorPage from "./pages/atlas/AtlasMentorPage";
import AtlasResearchPage from "./pages/atlas/AtlasResearchPage";
import AtlasPrescriptionPage from "./pages/atlas/AtlasPrescriptionPage";
import AtlasSpeakPage from "./pages/atlas/AtlasSpeakPage";

// AI Mentor & Chat (legacy)
import AIMentorPage from "./pages/AIMentorPage";
import ChatPage from "./pages/ChatPage";

// Scanner
import ScannerHubPage from "./pages/scanner/ScannerHubPage";
import ScannerHistoryPage from "./pages/scanner/ScannerHistoryPage";
import ScannerResultPage from "./pages/scanner/ScannerResultPage";
import ScannerVisionPage from "./pages/scanner/ScannerVisionPage";
import ScannerBiomechanicsPage from "./pages/scanner/ScannerBiomechanicsPage";
import ScannerUploadsPage from "./pages/scanner/ScannerUploadsPage";

// Anamnesis
import AnamnesisListPage from "./pages/anamnesis/AnamnesisListPage";
import AnamnesisNewPage from "./pages/anamnesis/AnamnesisNewPage";
import AnamnesisImportPage from "./pages/anamnesis/AnamnesisImportPage";
import AnamnesisDetailPage from "./pages/anamnesis/AnamnesisDetailPage";

// Prescriptions
import PrescriptionListPage from "./pages/prescriptions/PrescriptionListPage";
import PrescriptionNewPage from "./pages/prescriptions/PrescriptionNewPage";
import PrescriptionDetailPage from "./pages/prescriptions/PrescriptionDetailPage";
import PrescriptionHistoryPage from "./pages/prescriptions/PrescriptionHistoryPage";
import PrescriptionExportPage from "./pages/prescriptions/PrescriptionExportPage";

// Training
import TrainingHubPage from "./pages/training/TrainingHubPage";
import TrainingProgramsSubPage from "./pages/training/TrainingProgramsSubPage";
import TrainingSessionPage from "./pages/training/TrainingSessionPage";
import TrainingSummaryPage from "./pages/training/TrainingSummaryPage";
import TrainingProgressPage from "./pages/training/TrainingProgressPage";

// Lab
import LabHubPage from "./pages/lab/LabHubPage";
import LabRMPage from "./pages/lab/LabRMPage";
import LabRPEPage from "./pages/lab/LabRPEPage";
import LabVolumePage from "./pages/lab/LabVolumePage";
import { LabBMIPage, LabBMRPage, LabMacrosPage } from "./pages/lab/LabCalculators";
import LabDoseResponsePage from "./pages/lab/LabDoseResponsePage";
import LabResearchPage from "./pages/lab/LabResearchPage";

// Performance
import PerformancePage from "./pages/PerformancePage";
import { PerformanceFeedPage, PerformanceInsightsPage, PerformanceLeaderboardsPage, PerformanceChallengesPage, PerformanceLogbookPage, PerformanceCardsPage } from "./pages/performance/PerformanceSubPages";

// Library & Academic
import LibraryPage from "./pages/LibraryPage";
import { LibraryFavoritesPage, LibraryDetailPage, AcademicSearchPage, AcademicSavedPage, AcademicPaperPage } from "./pages/library/LibraryAcademicSubPages";
import AcademicPage from "./pages/AcademicPage";

// Pro modules
import NexusPremiumPage from "./pages/NexusPremiumPage";
import TrainingProPage from "./pages/TrainingProPage";
import EditorialProPage from "./pages/EditorialProPage";
import NutriProPage from "./pages/NutriProPage";
import CoachProPage from "./pages/CoachProPage";

// Other tools
import StorePage from "./pages/StorePage";
import TrainingProgramsPage from "./pages/TrainingProgramsPage";
import ForumPage from "./pages/ForumPage";
import UploadsPage from "./pages/UploadsPage";
import AffiliatesPage from "./pages/AffiliatesPage";
import ClientsPage from "./pages/ClientsPage";
import BillingPage from "./pages/BillingPage";
import { BillingSubscriptionPage, BillingHistoryPage, BillingEntitlementsPage } from "./pages/billing/BillingSubPages";

// Integrations
import IntegrationsPage from "./pages/IntegrationsPage";
import { GarminPage, GoogleFitPage, StravaPage } from "./pages/integrations/IntegrationSubPages";

// Admin
import AdminPage from "./pages/AdminPage";
import { AdminUsersPage, AdminUploadsPage, AdminLibraryPage, AdminPlansPage, AdminProductsPage, AdminStorePage, AdminBillingPage, AdminPayoutsPage, AdminLogsPage, AdminHealthPage, AdminObservabilityPage, AdminAuditPage, AdminSettingsPage, AdminExecutivePage } from "./pages/admin/AdminSubPages";

// Business
import { BusinessHubPage, BusinessDashboardPage, BusinessAnalyticsPage, BusinessBillingPage, BusinessIntegrationsPage, BusinessPlansPage, BusinessSettingsPage, BusinessTenantsPage, BusinessUsersPage, BusinessWorkspacesPage } from "./pages/business/BusinessSubPages";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes with shared layout */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<PublicLayout />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/science" element={<SciencePage />} />
              <Route path="/methods" element={<MethodsPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/enterprise" element={<EnterprisePage />} />
              <Route path="/business-info" element={<BusinessPublicPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Route>

            {/* Protected routes with sidebar layout */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              {/* Core */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/today" element={<TodayPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* Atlas IA */}
              <Route path="/atlas" element={<AtlasHubPage />} />
              <Route path="/atlas/chat" element={<AtlasChatPage />} />
              <Route path="/atlas/assistant" element={<AtlasAssistantPage />} />
              <Route path="/atlas/explain" element={<AtlasExplainPage />} />
              <Route path="/atlas/mentor" element={<AtlasMentorPage />} />
              <Route path="/atlas/research" element={<AtlasResearchPage />} />
              <Route path="/atlas/prescription" element={<AtlasPrescriptionPage />} />
              <Route path="/atlas/speak" element={<AtlasSpeakPage />} />

              {/* Legacy AI routes */}
              <Route path="/ai-mentor" element={<AIMentorPage />} />
              <Route path="/chat" element={<ChatPage />} />

              {/* Scanner */}
              <Route path="/scanner" element={<ScannerHubPage />} />
              <Route path="/scanner/history" element={<ScannerHistoryPage />} />
              <Route path="/scanner/result" element={<ScannerResultPage />} />
              <Route path="/scanner/:id" element={<ScannerResultPage />} />
              <Route path="/scanner/vision" element={<ScannerVisionPage />} />
              <Route path="/scanner/biomechanics" element={<ScannerBiomechanicsPage />} />
              <Route path="/scanner/uploads" element={<ScannerUploadsPage />} />

              {/* Anamnesis */}
              <Route path="/anamnesis" element={<AnamnesisListPage />} />
              <Route path="/anamnesis/list" element={<AnamnesisListPage />} />
              <Route path="/anamnesis/new" element={<AnamnesisNewPage />} />
              <Route path="/anamnesis/import" element={<AnamnesisImportPage />} />
              <Route path="/anamnesis/:id" element={<AnamnesisDetailPage />} />

              {/* Prescriptions */}
              <Route path="/prescriptions" element={<PrescriptionListPage />} />
              <Route path="/prescriptions/list" element={<PrescriptionListPage />} />
              <Route path="/prescriptions/new" element={<PrescriptionNewPage />} />
              <Route path="/prescriptions/history" element={<PrescriptionHistoryPage />} />
              <Route path="/prescriptions/export" element={<PrescriptionExportPage />} />
              <Route path="/prescriptions/:id" element={<PrescriptionDetailPage />} />

              {/* Training */}
              <Route path="/training" element={<TrainingHubPage />} />
              <Route path="/training/programs" element={<TrainingProgramsSubPage />} />
              <Route path="/training/session" element={<TrainingSessionPage />} />
              <Route path="/training/summary" element={<TrainingSummaryPage />} />
              <Route path="/training/progress" element={<TrainingProgressPage />} />

              {/* Lab */}
              <Route path="/lab" element={<LabHubPage />} />
              <Route path="/lab/rm" element={<LabRMPage />} />
              <Route path="/lab/rpe" element={<LabRPEPage />} />
              <Route path="/lab/volume" element={<LabVolumePage />} />
              <Route path="/lab/bmi" element={<LabBMIPage />} />
              <Route path="/lab/bmr" element={<LabBMRPage />} />
              <Route path="/lab/tdee" element={<LabBMRPage />} />
              <Route path="/lab/macros" element={<LabMacrosPage />} />
              <Route path="/lab/dose-response" element={<LabDoseResponsePage />} />
              <Route path="/lab/research" element={<LabResearchPage />} />

              {/* Performance */}
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/performance/feed" element={<PerformanceFeedPage />} />
              <Route path="/performance/insights" element={<PerformanceInsightsPage />} />
              <Route path="/performance/leaderboards" element={<PerformanceLeaderboardsPage />} />
              <Route path="/performance/challenges" element={<PerformanceChallengesPage />} />
              <Route path="/performance/logbook" element={<PerformanceLogbookPage />} />
              <Route path="/performance/cards" element={<PerformanceCardsPage />} />

              {/* Library */}
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/library/favorites" element={<LibraryFavoritesPage />} />
              <Route path="/library/:id" element={<LibraryDetailPage />} />

              {/* Academic */}
              <Route path="/academic" element={<AcademicPage />} />
              <Route path="/academic/search" element={<AcademicSearchPage />} />
              <Route path="/academic/saved" element={<AcademicSavedPage />} />
              <Route path="/academic/paper/:id" element={<AcademicPaperPage />} />

              {/* Pro modules */}
              <Route path="/premium" element={<NexusPremiumPage />} />
              <Route path="/treinamento-pro" element={<TrainingProPage />} />
              <Route path="/editorial-pro" element={<EditorialProPage />} />
              <Route path="/nutricao-pro" element={<NutriProPage />} />
              <Route path="/coach-pro" element={<CoachProPage />} />

              {/* Tools */}
              <Route path="/store" element={<StorePage />} />
              <Route path="/programs" element={<TrainingProgramsPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/uploads" element={<UploadsPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/clients" element={<ClientsPage />} />

              {/* Billing */}
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/billing/subscription" element={<BillingSubscriptionPage />} />
              <Route path="/billing/history" element={<BillingHistoryPage />} />
              <Route path="/billing/entitlements" element={<BillingEntitlementsPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              {/* Integrations */}
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/integrations/garmin" element={<GarminPage />} />
              <Route path="/integrations/google-fit" element={<GoogleFitPage />} />
              <Route path="/integrations/strava" element={<StravaPage />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/uploads" element={<AdminUploadsPage />} />
              <Route path="/admin/library" element={<AdminLibraryPage />} />
              <Route path="/admin/plans" element={<AdminPlansPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/store" element={<AdminStorePage />} />
              <Route path="/admin/billing" element={<AdminBillingPage />} />
              <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
              <Route path="/admin/logs" element={<AdminLogsPage />} />
              <Route path="/admin/health" element={<AdminHealthPage />} />
              <Route path="/admin/observability" element={<AdminObservabilityPage />} />
              <Route path="/admin/audit" element={<AdminAuditPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/executive" element={<AdminExecutivePage />} />

              {/* Business */}
              <Route path="/business" element={<BusinessHubPage />} />
              <Route path="/business/dashboard" element={<BusinessDashboardPage />} />
              <Route path="/business/analytics" element={<BusinessAnalyticsPage />} />
              <Route path="/business/billing" element={<BusinessBillingPage />} />
              <Route path="/business/integrations" element={<BusinessIntegrationsPage />} />
              <Route path="/business/plans" element={<BusinessPlansPage />} />
              <Route path="/business/settings" element={<BusinessSettingsPage />} />
              <Route path="/business/tenants" element={<BusinessTenantsPage />} />
              <Route path="/business/users" element={<BusinessUsersPage />} />
              <Route path="/business/workspaces" element={<BusinessWorkspacesPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
