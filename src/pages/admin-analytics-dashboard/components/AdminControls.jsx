import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdminControls = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const statusOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'premium', label: 'Premium' }
  ];

  const mockUsers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      status: 'active',
      lastActive: '2025-08-08 09:45:23',
      queries: 156,
      language: 'Hindi',
      joinDate: '2025-07-15',
      location: 'Mumbai, India'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      status: 'active',
      lastActive: '2025-08-08 10:12:45',
      queries: 89,
      language: 'English',
      joinDate: '2025-07-22',
      location: 'New York, USA'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      status: 'inactive',
      lastActive: '2025-08-06 14:30:12',
      queries: 234,
      language: 'Marathi',
      joinDate: '2025-06-10',
      location: 'Pune, India'
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      status: 'active',
      lastActive: '2025-08-08 08:22:15',
      queries: 67,
      language: 'Arabic',
      joinDate: '2025-07-28',
      location: 'Dubai, UAE'
    },
    {
      id: 5,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      status: 'suspended',
      lastActive: '2025-08-05 16:45:30',
      queries: 12,
      language: 'Spanish',
      joinDate: '2025-08-01',
      location: 'Madrid, Spain'
    }
  ];

  const systemSettings = [
    {
      category: 'AI Response',
      settings: [
        { key: 'response_timeout', label: 'Response Timeout', value: '30s', type: 'select' },
        { key: 'max_tokens', label: 'Max Tokens per Response', value: '2048', type: 'number' },
        { key: 'temperature', label: 'AI Temperature', value: '0.7', type: 'range' }
      ]
    },
    {
      category: 'User Limits',
      settings: [
        { key: 'daily_queries', label: 'Daily Query Limit', value: '50', type: 'number' },
        { key: 'session_timeout', label: 'Session Timeout', value: '30m', type: 'select' },
        { key: 'concurrent_sessions', label: 'Max Concurrent Sessions', value: '500', type: 'number' }
      ]
    },
    {
      category: 'Content Moderation',
      settings: [
        { key: 'auto_moderation', label: 'Auto Moderation', value: 'enabled', type: 'toggle' },
        { key: 'profanity_filter', label: 'Profanity Filter', value: 'strict', type: 'select' },
        { key: 'spam_detection', label: 'Spam Detection', value: 'enabled', type: 'toggle' }
      ]
    }
  ];

  const tabs = [
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'content', label: 'Content Moderation', icon: 'Shield' },
    { id: 'system', label: 'System Settings', icon: 'Settings' },
    { id: 'export', label: 'Data Export', icon: 'Download' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted/20';
      case 'suspended': return 'text-error bg-error/10';
      case 'premium': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const handleUserAction = (action, userId) => {
    console.log(`${action} user ${userId}`);
    // Implementation would handle user actions
  };

  const handleBulkAction = (action) => {
    console.log(`${action} for users:`, selectedUsers);
    // Implementation would handle bulk actions
  };

  const filteredUsers = mockUsers?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Administrative Controls
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            Manage users, content, and system configurations
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-sacred transition-contemplative ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="font-body text-sm font-medium">
              {tab?.label}
            </span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* User Management Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <Input
                  type="search"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-64"
                />
                <Select
                  options={statusOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  placeholder="Filter by status"
                />
              </div>
              
              {selectedUsers?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="font-caption text-sm text-muted-foreground">
                    {selectedUsers?.length} selected
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction('suspend')}>
                    Suspend
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction('activate')}>
                    Activate
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')}>
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e?.target?.checked) {
                            setSelectedUsers(filteredUsers?.map(u => u?.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                        className="rounded"
                      />
                    </th>
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">Queries</th>
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">Language</th>
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">Last Active</th>
                    <th className="text-left p-3 font-body text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user) => (
                    <tr key={user?.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers?.includes(user?.id)}
                          onChange={(e) => {
                            if (e?.target?.checked) {
                              setSelectedUsers([...selectedUsers, user?.id]);
                            } else {
                              setSelectedUsers(selectedUsers?.filter(id => id !== user?.id));
                            }
                          }}
                          className="rounded"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-body text-sm font-medium text-foreground">
                            {user?.name}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            {user?.location}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-sacred text-xs font-medium ${getStatusColor(user?.status)}`}>
                          {user?.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-sm text-foreground">
                          {user?.queries}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-body text-sm text-foreground">
                          {user?.language}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          {new Date(user.lastActive)?.toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleUserAction('view', user?.id)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Icon name="Eye" size={14} />
                          </button>
                          <button
                            onClick={() => handleUserAction('edit', user?.id)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Icon name="Edit" size={14} />
                          </button>
                          <button
                            onClick={() => handleUserAction('suspend', user?.id)}
                            className="p-1 text-muted-foreground hover:text-warning transition-colors"
                          >
                            <Icon name="Ban" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-muted/20 rounded-sacred p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="font-body text-sm font-medium text-foreground">
                    Flagged Content
                  </span>
                </div>
                <p className="font-mono text-2xl font-semibold text-foreground">23</p>
                <p className="font-caption text-xs text-muted-foreground">
                  Requires review
                </p>
              </div>
              
              <div className="bg-muted/20 rounded-sacred p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="font-body text-sm font-medium text-foreground">
                    Auto-Moderated
                  </span>
                </div>
                <p className="font-mono text-2xl font-semibold text-foreground">156</p>
                <p className="font-caption text-xs text-muted-foreground">
                  Today's actions
                </p>
              </div>
              
              <div className="bg-muted/20 rounded-sacred p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Ban" size={16} className="text-error" />
                  <span className="font-body text-sm font-medium text-foreground">
                    Blocked Content
                  </span>
                </div>
                <p className="font-mono text-2xl font-semibold text-foreground">7</p>
                <p className="font-caption text-xs text-muted-foreground">
                  Permanently blocked
                </p>
              </div>
            </div>
            
            <div className="text-center py-8">
              <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="font-body text-sm text-muted-foreground">
                Content moderation tools and flagged content review interface would be implemented here
              </p>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            {systemSettings?.map((category, index) => (
              <div key={index} className="bg-muted/20 rounded-sacred p-4">
                <h4 className="font-heading text-sm font-medium text-foreground mb-4">
                  {category?.category}
                </h4>
                <div className="space-y-3">
                  {category?.settings?.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between">
                      <div>
                        <p className="font-body text-sm text-foreground">
                          {setting?.label}
                        </p>
                      </div>
                      <div className="w-32">
                        {setting?.type === 'toggle' ? (
                          <button className="w-12 h-6 bg-primary rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                          </button>
                        ) : (
                          <Input
                            type={setting?.type === 'range' ? 'range' : setting?.type}
                            value={setting?.value}
                            className="text-xs"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-muted/20 rounded-sacred p-4">
                <h4 className="font-heading text-sm font-medium text-foreground mb-4">
                  User Data Export
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth iconName="Users">
                    Export User List (CSV)
                  </Button>
                  <Button variant="outline" fullWidth iconName="MessageSquare">
                    Export Chat Logs (JSON)
                  </Button>
                  <Button variant="outline" fullWidth iconName="BarChart3">
                    Export Analytics (Excel)
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/20 rounded-sacred p-4">
                <h4 className="font-heading text-sm font-medium text-foreground mb-4">
                  System Reports
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth iconName="Activity">
                    Performance Report
                  </Button>
                  <Button variant="outline" fullWidth iconName="Globe">
                    Language Usage Report
                  </Button>
                  <Button variant="outline" fullWidth iconName="TrendingUp">
                    Growth Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminControls;