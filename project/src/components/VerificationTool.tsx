import React, { useState } from 'react';
import { Shield, Upload, CheckCircle, XCircle, Search, FileText } from 'lucide-react';

export const VerificationTool: React.FC = () => {
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'valid' | 'invalid'>('idle');
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificateData, setCertificateData] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      
      // Mock file reading and verification
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          setCertificateData(data);
          
          // Simulate verification process
          setVerificationState('verifying');
          setTimeout(() => {
            // Mock verification logic
            const isValid = data.certificate && data.certificate.signature;
            setVerificationState(isValid ? 'valid' : 'invalid');
          }, 2000);
        } catch (error) {
          setVerificationState('invalid');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetVerification = () => {
    setVerificationState('idle');
    setCertificateFile(null);
    setCertificateData(null);
  };

  const renderIdleState = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 rounded-full mb-6">
          <Search className="h-10 w-10 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Certificate Verification</h1>
        <p className="text-xl text-slate-300 mb-8">
          Verify the authenticity and integrity of wipe certificates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="h-6 w-6 mr-2" />
            Upload Certificate
          </h3>
          
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors">
            <input
              type="file"
              accept=".json,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="certificate-upload"
            />
            <label
              htmlFor="certificate-upload"
              className="cursor-pointer block"
            >
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-white font-medium mb-2">
                Drop your certificate file here
              </p>
              <p className="text-slate-400 text-sm">
                Supports JSON and PDF certificate files
              </p>
              <div className="mt-4">
                <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Browse Files
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Manual Verification */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6">Manual Verification</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                placeholder="Enter certificate ID (e.g., WP-1234567890)"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Signature Hash
              </label>
              <input
                type="text"
                placeholder="Enter signature hash"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Verify Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
        <h3 className="text-lg font-semibold text-white mb-4">What We Verify</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-green-400 mt-1" />
            <div>
              <h4 className="font-medium text-white">Digital Signature</h4>
              <p className="text-sm text-slate-400">Cryptographic verification of certificate authenticity</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-blue-400 mt-1" />
            <div>
              <h4 className="font-medium text-white">Data Integrity</h4>
              <p className="text-sm text-slate-400">Ensures certificate hasn't been tampered with</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FileText className="h-6 w-6 text-purple-400 mt-1" />
            <div>
              <h4 className="font-medium text-white">Compliance Check</h4>
              <p className="text-sm text-slate-400">Validates adherence to NIST SP 800-88 standards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifyingState = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-blue-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Search className="h-10 w-10 text-blue-400 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Verifying Certificate</h2>
      <p className="text-slate-300 mb-8">
        Checking digital signature and certificate integrity...
      </p>
      
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Validating signature</span>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Checking integrity</span>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Verifying compliance</span>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderValidState = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-green-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Certificate Valid ✓</h2>
        <p className="text-slate-300">
          The certificate has been successfully verified and is authentic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Certificate Details</h3>
          {certificateData?.certificate && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Certificate ID:</span>
                <span className="text-white font-mono">{certificateData.certificate.wipeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Device:</span>
                <span className="text-white">{certificateData.certificate.device.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="text-white">{certificateData.certificate.wipeDetails.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-green-400">{certificateData.certificate.wipeDetails.status}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Verification Results</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-white">Digital signature valid</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-white">Certificate integrity verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-white">NIST SP 800-88 compliant</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={resetVerification}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Verify Another Certificate
        </button>
      </div>
    </div>
  );

  const renderInvalidState = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-red-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <XCircle className="h-10 w-10 text-red-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Certificate Invalid ✗</h2>
      <p className="text-slate-300 mb-8">
        The certificate could not be verified or has been tampered with
      </p>
      
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 mb-8">
        <h3 className="text-red-300 font-semibold mb-2">Verification Failed</h3>
        <div className="text-red-200 text-sm space-y-1">
          <div>• Invalid or missing digital signature</div>
          <div>• Certificate data may have been modified</div>
          <div>• File format not recognized</div>
        </div>
      </div>
      
      <button
        onClick={resetVerification}
        className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  switch (verificationState) {
    case 'verifying':
      return renderVerifyingState();
    case 'valid':
      return renderValidState();
    case 'invalid':
      return renderInvalidState();
    default:
      return renderIdleState();
  }
};