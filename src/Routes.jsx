import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoveLettersManager from './pages/love-letters-manager';
import VoiceNotesStudio from './pages/voice-notes-studio';
import DesktopHome from './pages/desktop-home';
import PhotoTimelineGallery from './pages/photo-timeline-gallery';
import SecretBoxVault from './pages/secret-box-vault';
import SharedCalendarPlanner from './pages/shared-calendar-planner';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DesktopHome />} />
        <Route path="/love-letters-manager" element={<LoveLettersManager />} />
        <Route path="/voice-notes-studio" element={<VoiceNotesStudio />} />
        <Route path="/desktop-home" element={<DesktopHome />} />
        <Route path="/photo-timeline-gallery" element={<PhotoTimelineGallery />} />
        <Route path="/secret-box-vault" element={<SecretBoxVault />} />
        <Route path="/shared-calendar-planner" element={<SharedCalendarPlanner />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
