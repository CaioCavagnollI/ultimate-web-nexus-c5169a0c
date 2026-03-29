import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { lazy, Suspense } from "react";

import PublicLayout from "./components/PublicLayout";
import Layout from "./components/Layout";

// Loading fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-display font-bold text-primary-foreground text-lg animate-pulse">N</div>
  </div>
);

// Public pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
const AboutPage = lazy(() => import("./pages/public/AboutPage"));
const SciencePage = lazy(() => import("./pages/public/SciencePage"));
const MethodsPage = lazy(() => import("./pages/public/MethodsPage"));
const ResearchPage = lazy(() => import("./pages/public/ResearchPage"));
const PlansPage = lazy(() => import("./pages/public/PlansPage"));
const FAQPage = lazy(() => import("./pages/public/FAQPage"));
const EnterprisePage = lazy(() => import("./pages/public/EnterprisePage"));
const BusinessPublicPage = lazy(() => import("./pages/public/BusinessPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

// Core app
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TodayPage = lazy(() => import("./pages/TodayPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const FeedPage = lazy(() => import("./pages/FeedPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));

// Atlas IA
const AtlasHubPage = lazy(() => import("./pages/atlas/AtlasHubPage"));
const AtlasChatPage = lazy(() => import("./pages/atlas/AtlasChatPage"));
const AtlasAssistantPage = lazy(() => import("./pages/atlas/AtlasAssistantPage"));
const AtlasExplainPage = lazy(() => import("./pages/atlas/AtlasExplainPage"));
const AtlasMentorPage = lazy(() => import("./pages/atlas/AtlasMentorPage"));
const AtlasResearchPage = lazy(() => import("./pages/atlas/AtlasResearchPage"));
const AtlasPrescriptionPage = lazy(() => import("./pages/atlas/AtlasPrescriptionPage"));
const AtlasSpeakPage = lazy(() => import("./pages/atlas/AtlasSpeakPage"));

// AI Mentor & Chat (legacy)
const AIMentorPage = lazy(() => import("./pages/AIMentorPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

// Scanner
const ScannerHubPage = lazy(() => import("./pages/scanner/ScannerHubPage"));
const ScannerHistoryPage = lazy(() => import("./pages/scanner/ScannerHistoryPage"));
const ScannerResultPage = lazy(() => import("./pages/scanner/ScannerResultPage"));
const ScannerVisionPage = lazy(() => import("./pages/scanner/ScannerVisionPage"));
const ScannerBiomechanicsPage = lazy(() => import("./pages/scanner/ScannerBiomechanicsPage"));
const ScannerUploadsPage = lazy(() => import("./pages/scanner/ScannerUploadsPage"));

// Anamnesis
const AnamnesisListPage = lazy(() => import("./pages/anamnesis/AnamnesisListPage"));
const AnamnesisNewPage = lazy(() => import("./pages/anamnesis/AnamnesisNewPage"));
const AnamnesisImportPage = lazy(() => import("./pages/anamnesis/AnamnesisImportPage"));
const AnamnesisDetailPage = lazy(() => import("./pages/anamnesis/AnamnesisDetailPage"));

// Prescriptions
const PrescriptionListPage = lazy(() => import("./pages/prescriptions/PrescriptionListPage"));
const PrescriptionNewPage = lazy(() => import("./pages/prescriptions/PrescriptionNewPage"));
const PrescriptionDetailPage = lazy(() => import("./pages/prescriptions/PrescriptionDetailPage"));
const PrescriptionHistoryPage = lazy(() => import("./pages/prescriptions/PrescriptionHistoryPage"));
const PrescriptionExportPage = lazy(() => import("./pages/prescriptions/PrescriptionExportPage"));

// Training
const TrainingHubPage = lazy(() => import("./pages/training/TrainingHubPage"));
const TrainingProgramsSubPage = lazy(() => import("./pages/training/TrainingProgramsSubPage"));
const TrainingSessionPage = lazy(() => import("./pages/training/TrainingSessionPage"));
const TrainingSummaryPage = lazy(() => import("./pages/training/TrainingSummaryPage"));
const TrainingProgressPage = lazy(() => import("./pages/training/TrainingProgressPage"));

// Lab
const LabHubPage = lazy(() => import("./pages/lab/LabHubPage"));
const LabRMPage = lazy(() => import("./pages/lab/LabRMPage"));
const LabRPEPage = lazy(() => import("./pages/lab/LabRPEPage"));
const LabVolumePage = lazy(() => import("./pages/lab/LabVolumePage"));
const LabDoseResponsePage = lazy(() => import("./pages/lab/LabDoseResponsePage"));
const LabResearchPage = lazy(() => import("./pages/lab/LabResearchPage"));

// Performance
const PerformancePage = lazy(() => import("./pages/PerformancePage"));

// Library & Academic
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const AcademicPage = lazy(() => import("./pages/AcademicPage"));

// Pro modules
const NexusPremiumPage = lazy(() => import("./pages/NexusPremiumPage"));
const TrainingProPage = lazy(() => import("./pages/TrainingProPage"));
const EditorialProPage = lazy(() => import("./pages/EditorialProPage"));
const NutriProPage = lazy(() => import("./pages/NutriProPage"));
const CoachProPage = lazy(() => import("./pages/CoachProPage"));

// Other tools
const StorePage = lazy(() => import("./pages/StorePage"));
const TrainingProgramsPage = lazy(() => import("./pages/TrainingProgramsPage"));
const ForumPage = lazy(() => import("./pages/ForumPage"));
const UploadsPage = lazy(() => import("./pages/UploadsPage"));
const AffiliatesPage = lazy(() => import("./pages/AffiliatesPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const BillingPage = lazy(() => import("./pages/BillingPage"));

// Integrations
const IntegrationsPage = lazy(() => import("./pages/IntegrationsPage"));

// Admin
const AdminPage = lazy(() => import("./pages/AdminPage"));

import NotFound from "./pages/NotFound";

// Lazy sub-page loaders
const LazyLabCalculators = lazy(() => import("./pages/lab/LabCalculators").then(m => ({ default: m.LabBMIPage })));
const LazyLabBMR = lazy(() => import("./pages/lab/LabCalculators").then(m => ({ default: m.LabBMRPage })));
const LazyLabMacros = lazy(() => import("./pages/lab/LabCalculators").then(m => ({ default: m.LabMacrosPage })));

const LazyPerfFeed = lazy(() => import("./pages/performance/PerformanceSubPages").then(m => ({ default: m.PerformanceFeedPage })));
const LazyPerfInsights = lazy(() => import("./pages/performance/PerformanceSubPages").then(m => ({ default: m.PerformanceInsightsPage })));
const LazyPerfLeaderboards = lazy(() => import("./pages/performance/PerformanceSubPages").then(m => ({ default: m.PerformanceLeaderboardsPage })));
const LazyPerfChallenges = lazy(() => import("./pages/performance/PerformanceSubPages").then(m => ({ default: m.PerformanceChallengesPage })));
const LazyPerfLogbook = lazy(() => import("./pages/performance/PerformanceSubPages").then(m => ({ default: m.PerformanceLogbookPage })));
const LazyPerfCards = lazy(() => import("./pages/performance/PerformanceSubPages").then(m => ({ default: m.PerformanceCardsPage })));

const LazyLibFavorites = lazy(() => import("./pages/library/LibraryAcademicSubPages").then(m => ({ default: m.LibraryFavoritesPage })));
const LazyLibDetail = lazy(() => import("./pages/library/LibraryAcademicSubPages").then(m => ({ default: m.LibraryDetailPage })));
const LazyAcademicSearch = lazy(() => import("./pages/library/LibraryAcademicSubPages").then(m => ({ default: m.AcademicSearchPage })));
const LazyAcademicSaved = lazy(() => import("./pages/library/LibraryAcademicSubPages").then(m => ({ default: m.AcademicSavedPage })));
const LazyAcademicPaper = lazy(() => import("./pages/library/LibraryAcademicSubPages").then(m => ({ default: m.AcademicPaperPage })));

const LazyBillingSub = lazy(() => import("./pages/billing/BillingSubPages").then(m => ({ default: m.BillingSubscriptionPage })));
const LazyBillingHist = lazy(() => import("./pages/billing/BillingSubPages").then(m => ({ default: m.BillingHistoryPage })));
const LazyBillingEnt = lazy(() => import("./pages/billing/BillingSubPages").then(m => ({ default: m.BillingEntitlementsPage })));

const LazyGarmin = lazy(() => import("./pages/integrations/IntegrationSubPages").then(m => ({ default: m.GarminPage })));
const LazyGoogleFit = lazy(() => import("./pages/integrations/IntegrationSubPages").then(m => ({ default: m.GoogleFitPage })));
const LazyStrava = lazy(() => import("./pages/integrations/IntegrationSubPages").then(m => ({ default: m.StravaPage })));

const LazyAdminUsers = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminUsersPage })));
const LazyAdminUploads = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminUploadsPage })));
const LazyAdminLibrary = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminLibraryPage })));
const LazyAdminPlans = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminPlansPage })));
const LazyAdminProducts = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminProductsPage })));
const LazyAdminStore = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminStorePage })));
const LazyAdminBilling = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminBillingPage })));
const LazyAdminPayouts = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminPayoutsPage })));
const LazyAdminLogs = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminLogsPage })));
const LazyAdminHealth = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminHealthPage })));
const LazyAdminObservability = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminObservabilityPage })));
const LazyAdminAudit = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminAuditPage })));
const LazyAdminSettings = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminSettingsPage })));
const LazyAdminExecutive = lazy(() => import("./pages/admin/AdminSubPages").then(m => ({ default: m.AdminExecutivePage })));

const LazyBizHub = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessHubPage })));
const LazyBizDashboard = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessDashboardPage })));
const LazyBizAnalytics = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessAnalyticsPage })));
const LazyBizBilling = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessBillingPage })));
const LazyBizIntegrations = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessIntegrationsPage })));
const LazyBizPlans = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessPlansPage })));
const LazyBizSettings = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessSettingsPage })));
const LazyBizTenants = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessTenantsPage })));
const LazyBizUsers = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessUsersPage })));
const LazyBizWorkspaces = lazy(() => import("./pages/business/BusinessSubPages").then(m => ({ default: m.BusinessWorkspacesPage })));

const queryClient = new QueryClient();

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes with shared layout */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route element={<PublicLayout />}>
                <Route path="/about" element={<S><AboutPage /></S>} />
                <Route path="/science" element={<S><SciencePage /></S>} />
                <Route path="/methods" element={<S><MethodsPage /></S>} />
                <Route path="/research" element={<S><ResearchPage /></S>} />
                <Route path="/plans" element={<S><PlansPage /></S>} />
                <Route path="/faq" element={<S><FAQPage /></S>} />
                <Route path="/enterprise" element={<S><EnterprisePage /></S>} />
                <Route path="/business-info" element={<S><BusinessPublicPage /></S>} />
                <Route path="/contact" element={<S><ContactPage /></S>} />
                <Route path="/terms" element={<S><TermsPage /></S>} />
                <Route path="/privacy" element={<S><PrivacyPage /></S>} />
              </Route>

              {/* Protected routes with sidebar layout */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                {/* Core */}
                <Route path="/dashboard" element={<S><DashboardPage /></S>} />
                <Route path="/today" element={<S><TodayPage /></S>} />
                <Route path="/onboarding" element={<S><OnboardingPage /></S>} />
                <Route path="/feed" element={<S><FeedPage /></S>} />
                <Route path="/profile" element={<S><ProfilePage /></S>} />
                <Route path="/settings" element={<S><SettingsPage /></S>} />

                {/* Atlas IA */}
                <Route path="/atlas" element={<S><AtlasHubPage /></S>} />
                <Route path="/atlas/chat" element={<S><AtlasChatPage /></S>} />
                <Route path="/atlas/assistant" element={<S><AtlasAssistantPage /></S>} />
                <Route path="/atlas/explain" element={<S><AtlasExplainPage /></S>} />
                <Route path="/atlas/mentor" element={<S><AtlasMentorPage /></S>} />
                <Route path="/atlas/research" element={<S><AtlasResearchPage /></S>} />
                <Route path="/atlas/prescription" element={<S><AtlasPrescriptionPage /></S>} />
                <Route path="/atlas/speak" element={<S><AtlasSpeakPage /></S>} />

                {/* Legacy AI routes */}
                <Route path="/ai-mentor" element={<S><AIMentorPage /></S>} />
                <Route path="/chat" element={<S><ChatPage /></S>} />

                {/* Scanner */}
                <Route path="/scanner" element={<S><ScannerHubPage /></S>} />
                <Route path="/scanner/history" element={<S><ScannerHistoryPage /></S>} />
                <Route path="/scanner/result" element={<S><ScannerResultPage /></S>} />
                <Route path="/scanner/:id" element={<S><ScannerResultPage /></S>} />
                <Route path="/scanner/vision" element={<S><ScannerVisionPage /></S>} />
                <Route path="/scanner/biomechanics" element={<S><ScannerBiomechanicsPage /></S>} />
                <Route path="/scanner/uploads" element={<S><ScannerUploadsPage /></S>} />

                {/* Anamnesis */}
                <Route path="/anamnesis" element={<S><AnamnesisListPage /></S>} />
                <Route path="/anamnesis/list" element={<S><AnamnesisListPage /></S>} />
                <Route path="/anamnesis/new" element={<S><AnamnesisNewPage /></S>} />
                <Route path="/anamnesis/import" element={<S><AnamnesisImportPage /></S>} />
                <Route path="/anamnesis/:id" element={<S><AnamnesisDetailPage /></S>} />

                {/* Prescriptions */}
                <Route path="/prescriptions" element={<S><PrescriptionListPage /></S>} />
                <Route path="/prescriptions/list" element={<S><PrescriptionListPage /></S>} />
                <Route path="/prescriptions/new" element={<S><PrescriptionNewPage /></S>} />
                <Route path="/prescriptions/history" element={<S><PrescriptionHistoryPage /></S>} />
                <Route path="/prescriptions/export" element={<S><PrescriptionExportPage /></S>} />
                <Route path="/prescriptions/:id" element={<S><PrescriptionDetailPage /></S>} />

                {/* Training */}
                <Route path="/training" element={<S><TrainingHubPage /></S>} />
                <Route path="/training/programs" element={<S><TrainingProgramsSubPage /></S>} />
                <Route path="/training/session" element={<S><TrainingSessionPage /></S>} />
                <Route path="/training/summary" element={<S><TrainingSummaryPage /></S>} />
                <Route path="/training/progress" element={<S><TrainingProgressPage /></S>} />

                {/* Lab */}
                <Route path="/lab" element={<S><LabHubPage /></S>} />
                <Route path="/lab/rm" element={<S><LabRMPage /></S>} />
                <Route path="/lab/rpe" element={<S><LabRPEPage /></S>} />
                <Route path="/lab/volume" element={<S><LabVolumePage /></S>} />
                <Route path="/lab/bmi" element={<S><LazyLabCalculators /></S>} />
                <Route path="/lab/bmr" element={<S><LazyLabBMR /></S>} />
                <Route path="/lab/tdee" element={<S><LazyLabBMR /></S>} />
                <Route path="/lab/macros" element={<S><LazyLabMacros /></S>} />
                <Route path="/lab/dose-response" element={<S><LabDoseResponsePage /></S>} />
                <Route path="/lab/research" element={<S><LabResearchPage /></S>} />

                {/* Performance */}
                <Route path="/performance" element={<S><PerformancePage /></S>} />
                <Route path="/performance/feed" element={<S><LazyPerfFeed /></S>} />
                <Route path="/performance/insights" element={<S><LazyPerfInsights /></S>} />
                <Route path="/performance/leaderboards" element={<S><LazyPerfLeaderboards /></S>} />
                <Route path="/performance/challenges" element={<S><LazyPerfChallenges /></S>} />
                <Route path="/performance/logbook" element={<S><LazyPerfLogbook /></S>} />
                <Route path="/performance/cards" element={<S><LazyPerfCards /></S>} />

                {/* Library */}
                <Route path="/library" element={<S><LibraryPage /></S>} />
                <Route path="/library/favorites" element={<S><LazyLibFavorites /></S>} />
                <Route path="/library/:id" element={<S><LazyLibDetail /></S>} />

                {/* Academic */}
                <Route path="/academic" element={<S><AcademicPage /></S>} />
                <Route path="/academic/search" element={<S><LazyAcademicSearch /></S>} />
                <Route path="/academic/saved" element={<S><LazyAcademicSaved /></S>} />
                <Route path="/academic/paper/:id" element={<S><LazyAcademicPaper /></S>} />

                {/* Pro modules */}
                <Route path="/premium" element={<S><NexusPremiumPage /></S>} />
                <Route path="/treinamento-pro" element={<S><TrainingProPage /></S>} />
                <Route path="/editorial-pro" element={<S><EditorialProPage /></S>} />
                <Route path="/nutricao-pro" element={<S><NutriProPage /></S>} />
                <Route path="/coach-pro" element={<S><CoachProPage /></S>} />

                {/* Tools */}
                <Route path="/store" element={<S><StorePage /></S>} />
                <Route path="/programs" element={<S><TrainingProgramsPage /></S>} />
                <Route path="/forum" element={<S><ForumPage /></S>} />
                <Route path="/uploads" element={<S><UploadsPage /></S>} />
                <Route path="/affiliates" element={<S><AffiliatesPage /></S>} />
                <Route path="/clients" element={<S><ClientsPage /></S>} />

                {/* Billing */}
                <Route path="/billing" element={<S><BillingPage /></S>} />
                <Route path="/billing/subscription" element={<S><LazyBillingSub /></S>} />
                <Route path="/billing/history" element={<S><LazyBillingHist /></S>} />
                <Route path="/billing/entitlements" element={<S><LazyBillingEnt /></S>} />
                <Route path="/pricing" element={<S><PricingPage /></S>} />

                {/* Integrations */}
                <Route path="/integrations" element={<S><IntegrationsPage /></S>} />
                <Route path="/integrations/garmin" element={<S><LazyGarmin /></S>} />
                <Route path="/integrations/google-fit" element={<S><LazyGoogleFit /></S>} />
                <Route path="/integrations/strava" element={<S><LazyStrava /></S>} />

                {/* Admin */}
                <Route path="/admin" element={<S><AdminPage /></S>} />
                <Route path="/admin/users" element={<S><LazyAdminUsers /></S>} />
                <Route path="/admin/uploads" element={<S><LazyAdminUploads /></S>} />
                <Route path="/admin/library" element={<S><LazyAdminLibrary /></S>} />
                <Route path="/admin/plans" element={<S><LazyAdminPlans /></S>} />
                <Route path="/admin/products" element={<S><LazyAdminProducts /></S>} />
                <Route path="/admin/store" element={<S><LazyAdminStore /></S>} />
                <Route path="/admin/billing" element={<S><LazyAdminBilling /></S>} />
                <Route path="/admin/payouts" element={<S><LazyAdminPayouts /></S>} />
                <Route path="/admin/logs" element={<S><LazyAdminLogs /></S>} />
                <Route path="/admin/health" element={<S><LazyAdminHealth /></S>} />
                <Route path="/admin/observability" element={<S><LazyAdminObservability /></S>} />
                <Route path="/admin/audit" element={<S><LazyAdminAudit /></S>} />
                <Route path="/admin/settings" element={<S><LazyAdminSettings /></S>} />
                <Route path="/admin/executive" element={<S><LazyAdminExecutive /></S>} />

                {/* Business */}
                <Route path="/business" element={<S><LazyBizHub /></S>} />
                <Route path="/business/dashboard" element={<S><LazyBizDashboard /></S>} />
                <Route path="/business/analytics" element={<S><LazyBizAnalytics /></S>} />
                <Route path="/business/billing" element={<S><LazyBizBilling /></S>} />
                <Route path="/business/integrations" element={<S><LazyBizIntegrations /></S>} />
                <Route path="/business/plans" element={<S><LazyBizPlans /></S>} />
                <Route path="/business/settings" element={<S><LazyBizSettings /></S>} />
                <Route path="/business/tenants" element={<S><LazyBizTenants /></S>} />
                <Route path="/business/users" element={<S><LazyBizUsers /></S>} />
                <Route path="/business/workspaces" element={<S><LazyBizWorkspaces /></S>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
