import React, { useState } from 'react';
import { FileCheck, Download, Share2, Shield, Calendar, Clock, HardDrive } from 'lucide-react';

interface CertificateGeneratorProps {
  certificateData: any;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ certificateData }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');

  if (!certificateData) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700/50">
          <FileCheck className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">No Certificate Data</h2>
          <p className="text-slate-400">Complete a wipe operation to generate a certificate</p>
        </div>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  const downloadPDF = () => {
    // Mock PDF download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('PDF Certificate Data');
    element.download = `wipe-certificate-${certificateData.wipeId}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(certificateData, null, 2);
    const element = document.createElement('a');
    element.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
    element.download = `wipe-certificate-${certificateData.wipeId}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const jsonData = {
    certificate: {
      version: '1.0',
      wipeId: certificateData.wipeId,
      timestamp: certificateData.timestamp,
      device: {
        name: certificateData.deviceName,
        identifier: certificateData.deviceId,
        type: 'storage'
      },
      wipeDetails: {
        method: certificateData.method,
        passes: certificateData.passes,
        duration: certificateData.duration,
        status: certificateData.status
      },
      compliance: {
        standard: 'NIST SP 800-88',
        verified: true
      },
      signature: {
        algorithm: 'RSA-SHA256',
        hash: '5f4dcc3b5aa765d61d8327deb882cf99aab2a7d94b7e7e5c7f5e8d9f3a2b1c0d',
        timestamp: certificateData.timestamp
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-full mb-4">
          <FileCheck className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Wipe Certificate Generated</h1>
        <p className="text-slate-300">Tamper-proof certificate of secure data erasure</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Certificate Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Certificate Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Wipe ID</div>
                  <div className="text-white font-mono text-sm">{certificateData.wipeId}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HardDrive className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Device</div>
                  <div className="text-white text-sm">{certificateData.deviceName}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Date</div>
                  <div className="text-white text-sm">{formatDate(certificateData.timestamp)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Duration</div>
                  <div className="text-white text-sm">{certificateData.duration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Actions */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Export Certificate</h3>
            <div className="space-y-3">
              <button
                onClick={downloadPDF}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={downloadJSON}
                className="w-full flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download JSON</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share Certificate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Preview/Data */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-slate-700/50">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'preview'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  PDF Preview
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'json'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  JSON Data
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'preview' && (
                <div className="bg-white rounded-lg p-8 text-gray-900 min-h-[600px]">
                  {/* PDF Preview Mock */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">SECURE DATA WIPE CERTIFICATE</h1>
                    <p className="text-gray-600">Digitally Signed Certificate of Data Sanitization</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-bold text-lg mb-4">Certificate Details</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>Certificate ID:</strong> {certificateData.wipeId}</div>
                        <div><strong>Issue Date:</strong> {formatDate(certificateData.timestamp)}</div>
                        <div><strong>Standard:</strong> NIST SP 800-88</div>
                        <div><strong>Status:</strong> <span className="text-green-600">{certificateData.status}</span></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4">Device Information</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>Device:</strong> {certificateData.deviceName}</div>
                        <div><strong>Device ID:</strong> {certificateData.deviceId}</div>
                        <div><strong>Wipe Method:</strong> {certificateData.method}</div>
                        <div><strong>Passes:</strong> {certificateData.passes}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Wipe Process Details</h3>
                    <div className="bg-gray-50 p-4 rounded text-sm">
                      <div className="grid grid-cols-3 gap-4">
                        <div><strong>Duration:</strong> {certificateData.duration}</div>
                        <div><strong>Start Time:</strong> {formatDate(certificateData.timestamp)}</div>
                        <div><strong>Completion:</strong> SUCCESS</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-bold text-lg mb-4">Digital Signature</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs">
                      <div className="mb-2"><strong>Algorithm:</strong> RSA-SHA256</div>
                      <div className="mb-2"><strong>Signature Hash:</strong></div>
                      <div className="break-all text-gray-600">
                        5f4dcc3b5aa765d61d8327deb882cf99aab2a7d94b7e7e5c7f5e8d9f3a2b1c0d
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'json' && (
                <div className="bg-slate-900 rounded-lg p-4">
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                    {JSON.stringify(jsonData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};