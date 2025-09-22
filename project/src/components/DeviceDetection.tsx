import React, { useState, useEffect } from 'react';
import { Monitor, HardDrive, Smartphone, Usb, Zap, Info, AlertCircle } from 'lucide-react';

export const DeviceDetection: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);

  const mockDevices = [
    {
      id: 'sda',
      name: 'Samsung SSD 850 EVO 500GB',
      type: 'SSD',
      size: '500 GB',
      interface: 'SATA',
      status: 'healthy',
      temperature: '45°C',
      hasHPA: false,
      hasDCO: false,
      supportsSecureErase: true,
      encrypted: false,
    },
    {
      id: 'nvme0n1',
      name: 'WD Black SN750 1TB NVMe',
      type: 'NVMe',
      size: '1 TB',
      interface: 'PCIe',
      status: 'healthy',
      temperature: '52°C',
      hasHPA: false,
      hasDCO: false,
      supportsSecureErase: true,
      encrypted: true,
    },
    {
      id: 'sdb',
      name: 'Seagate Barracuda 2TB HDD',
      type: 'HDD',
      size: '2 TB',
      interface: 'SATA',
      status: 'healthy',
      temperature: '38°C',
      hasHPA: true,
      hasDCO: false,
      supportsSecureErase: false,
      encrypted: false,
    },
    {
      id: 'mmcblk0',
      name: 'Internal eMMC Storage',
      type: 'eMMC',
      size: '64 GB',
      interface: 'eMMC',
      status: 'healthy',
      temperature: 'N/A',
      hasHPA: false,
      hasDCO: false,
      supportsSecureErase: true,
      encrypted: true,
    },
  ];

  const scanDevices = () => {
    setScanning(true);
    setDevices([]);
    
    // Simulate device scanning
    setTimeout(() => {
      setDevices(mockDevices);
      setScanning(false);
    }, 3000);
  };

  useEffect(() => {
    scanDevices();
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'SSD':
      case 'NVMe':
        return HardDrive;
      case 'HDD':
        return HardDrive;
      case 'eMMC':
        return Smartphone;
      default:
        return Usb;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
          <Monitor className="h-8 w-8 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Device Detection</h1>
        <p className="text-slate-300">Comprehensive analysis of connected storage devices</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-white">Detected Devices</h2>
          <p className="text-slate-400">
            {devices.length > 0 ? `Found ${devices.length} storage devices` : 'Scanning for devices...'}
          </p>
        </div>
        <button
          onClick={scanDevices}
          disabled={scanning}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Monitor className="h-4 w-4" />
          <span>{scanning ? 'Scanning...' : 'Rescan Devices'}</span>
        </button>
      </div>

      {scanning && (
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 text-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-white mb-2">Scanning Hardware</h3>
          <p className="text-slate-400">Detecting storage devices and analyzing capabilities...</p>
        </div>
      )}

      {devices.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {devices.map((device) => {
            const DeviceIcon = getDeviceIcon(device.type);
            return (
              <div key={device.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <DeviceIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{device.name}</h3>
                      <p className="text-sm text-slate-400">
                        {device.type} • {device.size} • {device.interface}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${getStatusColor(device.status)}`}>
                    {device.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-slate-400">Device ID</span>
                    <div className="text-white font-mono text-sm">{device.id}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Temperature</span>
                    <div className="text-white text-sm">{device.temperature}</div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="border-t border-slate-700/50 pt-4">
                  <h4 className="text-sm font-semibold text-white mb-3">Security Features</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`flex items-center space-x-2 ${device.supportsSecureErase ? 'text-green-400' : 'text-slate-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${device.supportsSecureErase ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                      <span>Secure Erase</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${device.encrypted ? 'text-green-400' : 'text-slate-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${device.encrypted ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                      <span>Encrypted</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${device.hasHPA ? 'text-yellow-400' : 'text-slate-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${device.hasHPA ? 'bg-yellow-400' : 'bg-slate-500'}`}></div>
                      <span>HPA Detected</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${device.hasDCO ? 'text-yellow-400' : 'text-slate-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${device.hasDCO ? 'bg-yellow-400' : 'bg-slate-500'}`}></div>
                      <span>DCO Detected</span>
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {(device.hasHPA || device.hasDCO) && (
                  <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <div className="text-xs text-yellow-200">
                        Hidden areas detected. Special wiping procedures required.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Detection Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-white mb-2">Device Types</h4>
            <ul className="space-y-1 text-slate-400">
              <li>• SSD (Solid State Drives)</li>
              <li>• HDD (Hard Disk Drives)</li>
              <li>• NVMe (PCIe SSDs)</li>
              <li>• eMMC (Embedded storage)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Hidden Areas</h4>
            <ul className="space-y-1 text-slate-400">
              <li>• HPA (Host Protected Area)</li>
              <li>• DCO (Device Configuration)</li>
              <li>• Bad sectors</li>
              <li>• Reserved blocks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Security Features</h4>
            <ul className="space-y-1 text-slate-400">
              <li>• ATA Secure Erase</li>
              <li>• Encryption status</li>
              <li>• TRIM support</li>
              <li>• Write protection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Health Monitoring</h4>
            <ul className="space-y-1 text-slate-400">
              <li>• SMART status</li>
              <li>• Temperature readings</li>
              <li>• Error counters</li>
              <li>• Wear leveling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};