import React, { useState } from 'react';
import { Shield, AlertTriangle, Trash2, CheckCircle, Clock, HardDrive } from 'lucide-react';

interface WipeInterfaceProps {
  onWipeComplete: (certData: any) => void;
}

export const WipeInterface: React.FC<WipeInterfaceProps> = ({ onWipeComplete }) => {
  const [wipeState, setWipeState] = useState<'ready' | 'confirming' | 'wiping' | 'completed'>('ready');
  const [progress, setProgress] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [wipeMethod, setWipeMethod] = useState('DoD-5220.22-M');

  const mockDevices = [
    { id: 'sda', name: 'Samsung SSD 850 EVO 500GB', type: 'SSD', size: '500 GB' },
    { id: 'nvme0n1', name: 'NVMe PCIe SSD 1TB', type: 'NVMe', size: '1 TB' },
  ];

  const wipeMethods = [
    { id: 'DoD-5220.22-M', name: 'DoD 5220.22-M (3-pass)', description: 'Standard 3-pass overwrite' },
    { id: 'NIST-800-88', name: 'NIST SP 800-88', description: 'Single secure overwrite' },
    { id: 'Gutmann', name: 'Gutmann (35-pass)', description: 'Maximum security overwrite' },
    { id: 'ATA-Secure-Erase', name: 'ATA Secure Erase', description: 'Hardware-level secure erase' },
  ];

  const startWipe = () => {
    setWipeState('wiping');
    setProgress(0);
    
    // Simulate wipe progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setWipeState('completed');
          
          // Generate mock certificate data
          const certData = {
            wipeId: `WP-${Date.now()}`,
            deviceName: mockDevices.find(d => d.id === selectedDevice)?.name || 'Unknown Device',
            deviceId: selectedDevice,
            method: wipeMethod,
            timestamp: new Date().toISOString(),
            duration: '2h 34m',
            status: 'SUCCESS',
            passes: wipeMethod === 'Gutmann' ? 35 : wipeMethod === 'DoD-5220.22-M' ? 3 : 1,
          };
          
          setTimeout(() => onWipeComplete(certData), 2000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const renderReadyState = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 rounded-full mb-6">
          <Shield className="h-10 w-10 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Secure Data Wiping</h1>
        <p className="text-xl text-slate-300 mb-8">
          Professional-grade data sanitization compliant with NIST SP 800-88
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Device Selection */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <HardDrive className="h-5 w-5 mr-2" />
            Select Device
          </h3>
          <div className="space-y-3">
            {mockDevices.map((device) => (
              <label key={device.id} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-600/50 hover:border-blue-500/50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="device"
                  value={device.id}
                  checked={selectedDevice === device.id}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="text-blue-600"
                />
                <div className="flex-1">
                  <div className="text-white font-medium">{device.name}</div>
                  <div className="text-sm text-slate-400">{device.type} • {device.size}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Wipe Method Selection */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Wipe Method</h3>
          <div className="space-y-3">
            {wipeMethods.map((method) => (
              <label key={method.id} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-600/50 hover:border-blue-500/50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="method"
                  value={method.id}
                  checked={wipeMethod === method.id}
                  onChange={(e) => setWipeMethod(e.target.value)}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <div className="text-white font-medium">{method.name}</div>
                  <div className="text-sm text-slate-400">{method.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <button
          onClick={() => setWipeState('confirming')}
          disabled={!selectedDevice}
          className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg"
        >
          <Trash2 className="h-5 w-5 mr-2 inline" />
          Start Secure Wipe
        </button>
        <p className="text-sm text-slate-400 mt-4">
          This action will permanently erase all data on the selected device
        </p>
      </div>
    </div>
  );

  const renderConfirmingState = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-red-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="h-10 w-10 text-red-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Confirm Data Wipe</h2>
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
        <div className="text-left space-y-4">
          <div>
            <span className="text-slate-400">Device:</span>
            <span className="text-white ml-2 font-medium">
              {mockDevices.find(d => d.id === selectedDevice)?.name}
            </span>
          </div>
          <div>
            <span className="text-slate-400">Method:</span>
            <span className="text-white ml-2 font-medium">
              {wipeMethods.find(m => m.id === wipeMethod)?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-8">
        <p className="text-red-300 font-semibold">⚠️ WARNING</p>
        <p className="text-red-200 text-sm mt-2">
          This action is irreversible. All data on the selected device will be permanently destroyed.
        </p>
      </div>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => setWipeState('ready')}
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={startWipe}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Confirm & Start Wipe
        </button>
      </div>
    </div>
  );

  const renderWipingState = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-blue-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Trash2 className="h-10 w-10 text-blue-400 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Wiping in Progress</h2>
      <p className="text-slate-300 mb-8">
        Securely erasing data from {mockDevices.find(d => d.id === selectedDevice)?.name}
      </p>
      
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Progress</span>
            <span className="text-white font-mono">{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 text-left">
          <div>
            <span className="text-slate-400 text-sm">Estimated Time</span>
            <div className="text-white font-mono">2h 34m remaining</div>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Current Pass</span>
            <div className="text-white font-mono">1 of 3</div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-400 mt-4">
        Do not power off or disconnect the device during wiping
      </p>
    </div>
  );

  const renderCompletedState = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Wipe Completed Successfully</h2>
      <p className="text-slate-300 mb-8">
        All data has been securely erased from the selected device
      </p>
      
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
        <div className="text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Device:</span>
            <span className="text-white">{mockDevices.find(d => d.id === selectedDevice)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Method:</span>
            <span className="text-white">{wipeMethods.find(m => m.id === wipeMethod)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Duration:</span>
            <span className="text-white">2h 34m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span className="text-green-400">SUCCESS</span>
          </div>
        </div>
      </div>
      
      <p className="text-slate-300">
        Generating wipe certificate...
      </p>
    </div>
  );

  switch (wipeState) {
    case 'ready':
      return renderReadyState();
    case 'confirming':
      return renderConfirmingState();
    case 'wiping':
      return renderWipingState();
    case 'completed':
      return renderCompletedState();
    default:
      return renderReadyState();
  }
};