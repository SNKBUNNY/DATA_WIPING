import React, { useState } from 'react';
import { WipeInterface } from './components/WipeInterface';
import { CertificateGenerator } from './components/CertificateGenerator';
import { VerificationTool } from './components/VerificationTool';
import { DeviceDetection } from './components/DeviceDetection';
import { ComplianceReport } from './components/ComplianceReport';
import { Shield, FileCheck, Search, Monitor, FileText } from 'lucide-react';

type ViewType = 'wipe' | 'certificate' | 'verify' | 'devices' | 'compliance';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('wipe');
  const [wipeCompleted, setWipeCompleted] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  const navigationItems = [
    { id: 'wipe' as ViewType, label: 'Secure Wipe', icon: Shield },
    { id: 'devices' as ViewType, label: 'Device Detection', icon: Monitor },
    { id: 'certificate' as ViewType, label: 'Certificates', icon: FileCheck },
    { id: 'verify' as ViewType, label: 'Verify Certificate', icon: Search },
    { id: 'compliance' as ViewType, label: 'Compliance', icon: FileText },
  ];

  const handleWipeComplete = (certData: any) => {
    setWipeCompleted(true);
    setCertificateData(certData);
    setCurrentView('certificate');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'wipe':
        return <WipeInterface onWipeComplete={handleWipeComplete} />;
      case 'certificate':
        return <CertificateGenerator certificateData={certificateData} />;
      case 'verify':
        return <VerificationTool />;
      case 'devices':
        return <DeviceDetection />;
      case 'compliance':
        return <ComplianceReport />;
      default:
        return <WipeInterface onWipeComplete={handleWipeComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-slate-800/80 backdrop-blur-sm border-r border-slate-700/50 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SecureWipe</h1>
                <p className="text-sm text-slate-400">Professional Data Erasure</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-300">NIST SP 800-88 Compliant</span>
              </div>
              <p className="text-xs text-slate-400">
                Secure data sanitization following industry standards
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;