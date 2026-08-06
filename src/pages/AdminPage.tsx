import React from 'react';
import { DeveloperVerificationPortal } from '../components/admin/DeveloperVerificationPortal';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export const AdminPage: React.FC = () => {
  return (
    <div className="space-y-6 py-4">
      {/* Developer Pre-Publish Verification Portal */}
      <DeveloperVerificationPortal />

      {/* General System Metrics & Moderation Queue */}
      <AdminDashboard />
    </div>
  );
};
