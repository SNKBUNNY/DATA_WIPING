import React, { useState } from 'react';
import { FileText, Shield, CheckCircle, AlertTriangle, Download, Calendar } from 'lucide-react';

export const ComplianceReport: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState('NIST-800-88');

  const standards = [
    {
      id: 'NIST-800-88',
      name: 'NIST SP 800-88 Rev. 1',
      description: 'Guidelines for Media Sanitization',
      authority: 'National Institute of Standards and Technology',
    },
    {
      id: 'DoD-5220.22-M',
      name: 'DoD 5220.22-M',
      description: 'National Industrial Security Program Operating Manual',
      authority: 'Department of Defense',
    },
    {
      id: 'HIPAA',
      name: 'HIPAA Security Rule',
      description: 'Health Insurance Portability and Accountability Act',
      authority: 'Department of Health and Human Services',
    },
    {
      id: 'GDPR',
      name: 'GDPR Article 17',
      description: 'General Data Protection Regulation - Right to Erasure',
      authority: 'European Union',
    },
  ];

  const complianceChecks = {
    'NIST-800-88': [
      {
        requirement: 'Media sanitization planning',
        status: 'compliant',
        description: 'Documented procedures for media sanitization',
      },
      {
        requirement: 'Clear (logical) sanitization',
        status: 'compliant',
        description: 'Overwriting data with non-sensitive data',
      },
      {
        requirement: 'Purge sanitization',
        status: 'compliant',
        description: 'Cryptographic erase or overwrite techniques',
      },
      {
        requirement: 'Destroy sanitization',
        status: 'partial',
        description: 'Physical destruction of media (when applicable)',
      },
      {
        requirement: 'Verification of sanitization',
        status: 'compliant',
        description: 'Certificate generation and verification',
      },
      {
        requirement: 'Documentation and reporting',
        status: 'compliant',
        description: 'Detailed logs and certificates',
      },
    ],
    'DoD-5220.22-M': [
      {
        requirement: '3-pass overwrite minimum',
        status: 'compliant',
        description: 'Multiple pass overwriting implemented',
      },
      {
        requirement: 'Random data patterns',
        status: 'compliant',
        description: 'Uses approved random patterns',
      },
      {
        requirement: 'Verification after each pass',
        status: 'compliant',
        description: 'Each pass is verified before next',
      },
      {
        requirement: 'Documentation requirements',
        status: 'compliant',
        description: 'Complete audit trail maintained',
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-400';
      case 'partial':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  const generateReport = () => {
    const reportData = {
      standard: selectedStandard,
      generatedAt: new Date().toISOString(),
      compliance: complianceChecks[selectedStandard as keyof typeof complianceChecks] || [],
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const element = document.createElement('a');
    element.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
    element.download = `compliance-report-${selectedStandard}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-full mb-4">
          <FileText className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Compliance Reports</h1>
        <p className="text-slate-300">Detailed compliance analysis against industry standards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Standards Selection */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Select Standard</h3>
            <div className="space-y-3">
              {standards.map((standard) => (
                <label
                  key={standard.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-slate-600/50 hover:border-blue-500/50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="standard"
                    value={standard.id}
                    checked={selectedStandard === standard.id}
                    onChange={(e) => setSelectedStandard(e.target.value)}
                    className="text-blue-600 mt-1"
                  />
                  <div>
                    <div className="text-white font-medium">{standard.name}</div>
                    <div className="text-sm text-slate-400">{standard.description}</div>
                    <div className="text-xs text-slate-500 mt-1">{standard.authority}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Report Actions</h3>
            <div className="space-y-3">
              <button
                onClick={generateReport}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
                <Calendar className="h-4 w-4" />
                <span>Schedule Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Compliance Details */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {standards.find(s => s.id === selectedStandard)?.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {standards.find(s => s.id === selectedStandard)?.description}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold text-white mb-6">Compliance Requirements</h4>
              
              <div className="space-y-4">
                {(complianceChecks[selectedStandard as keyof typeof complianceChecks] || []).map((check, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg">
                    <div className="mt-1">
                      {getStatusIcon(check.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium">{check.requirement}</h5>
                        <span className={`text-sm font-medium ${getStatusColor(check.status)}`}>
                          {check.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{check.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 p-4 bg-slate-900/50 rounded-lg">
                <h5 className="text-white font-semibold mb-3">Compliance Summary</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {(complianceChecks[selectedStandard as keyof typeof complianceChecks] || [])
                        .filter(c => c.status === 'compliant').length}
                    </div>
                    <div className="text-xs text-slate-400">Compliant</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">
                      {(complianceChecks[selectedStandard as keyof typeof complianceChecks] || [])
                        .filter(c => c.status === 'partial').length}
                    </div>
                    <div className="text-xs text-slate-400">Partial</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-400">
                      {(complianceChecks[selectedStandard as keyof typeof complianceChecks] || [])
                        .filter(c => c.status === 'non-compliant').length}
                    </div>
                    <div className="text-xs text-slate-400">Non-Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
        <h3 className="text-lg font-semibold text-white mb-4">Implementation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-white mb-2">Best Practices</h4>
            <ul className="space-y-1 text-slate-400">
              <li>• Maintain detailed audit logs</li>
              <li>• Verify each sanitization step</li>
              <li>• Use certified wiping methods</li>
              <li>• Regular compliance assessments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Documentation Requirements</h4>
            <ul className="space-y-1 text-slate-400">
              <li>• Device identification records</li>
              <li>• Sanitization method details</li>
              <li>• Verification certificates</li>
              <li>• Chain of custody logs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};