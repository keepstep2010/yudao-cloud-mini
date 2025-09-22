import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import ProjectWorkspace from '@components/ProjectWorkspace';
import ProjectSettings from '@components/ProjectSettings';
import ProjectMembers from '@components/ProjectMembers';
import ProjectTemplates from '@components/ProjectTemplates';
import UnifiedLanguage from '@components/UnifiedLanguage';
import StrategicDesign from '@components/StrategicDesign';
import TacticalDesign from '@components/TacticalDesign';
import DataTransfer from '@components/DataTransfer';
import ScreenDesign from '@components/ScreenDesign';
import AmisIntegration from '@components/AmisIntegration';

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<ProjectWorkspace />} />
        <Route path="/dashboard" element={<ProjectWorkspace />} />
        <Route path="/project/:id/settings" element={<ProjectSettings project={{} as any} onSave={() => {}} onAddMember={() => {}} onRemoveMember={() => {}} />} />
        <Route path="/project/:id/members" element={<ProjectMembers project={{} as any} onAddMember={() => {}} onUpdateMember={() => {}} onRemoveMember={() => {}} />} />
        <Route path="/templates" element={<ProjectTemplates />} />
        <Route path="/ddd/unified-language" element={<UnifiedLanguage />} />
        <Route path="/ddd/strategic-design" element={<StrategicDesign />} />
        <Route path="/ddd/tactical-design" element={<TacticalDesign />} />
        <Route path="/data-transfer" element={<DataTransfer />} />
        <Route path="/screen-design" element={<ScreenDesign />} />
        <Route path="/amis-integration" element={<AmisIntegration />} />
      </Routes>
    </Layout>
  );
};

export default App;
