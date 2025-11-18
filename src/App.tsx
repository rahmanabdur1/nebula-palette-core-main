import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "@/components/Layout";

import AdminDashboard from "./pages/AdminDashboard";
import Index from "./pages/Index"; // HOME PAGE (NO LAYOUT)
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Transactions from "./pages/Transactions";
import Slots from "./pages/Slots";
import SlotsDetail from "./pages/SlotsDetail";
import RoyaltySalary from "./pages/RoyaltySalary";
import TopEarners from "./pages/TopEarners";
import Lottery from "./pages/Lottery";
import CoinMining from "./pages/CoinMining";
import GamingNFT from "./pages/GamingNFT";
import DividendProgram from "./pages/DividendProgram";
import FutureUpdate from "./pages/FutureUpdate";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ---------------- HOME PAGE (WITHOUT LAYOUT) ---------------- */}
          <Route path="/" element={<Index />} />

          {/* ---------------- DASHBOARD ROUTES WITH LAYOUT ---------------- */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/team" element={<Team />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/slots/:type" element={<SlotsDetail />} />
            <Route path="/royalty-salary" element={<RoyaltySalary />} />
            <Route path="/top-earners" element={<TopEarners />} />
            <Route path="/lottery" element={<Lottery />} />
            <Route path="/coin-mining" element={<CoinMining />} />
            <Route path="/gaming-nft" element={<GamingNFT />} />
            <Route path="/dividend-program" element={<DividendProgram />} />
            <Route path="/future-update" element={<FutureUpdate />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
