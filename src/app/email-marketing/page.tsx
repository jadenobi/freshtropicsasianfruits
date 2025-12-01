'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import {
  getAllEmailCampaigns,
  getEmailStatistics,
  getEmailTemplatesByType,
  getEnabledEmailSequences,
  getABTestCampaigns,
  getAllEmailSubscribers,
  getActiveEmailSubscribers,
} from '@/lib/marketingService'

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'templates' | 'sequences' | 'subscribers'>('dashboard')
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  const campaigns = useMemo(() => getAllEmailCampaigns(), [])
  const stats = useMemo(() => getEmailStatistics(), [])
  const allSubscribers = useMemo(() => getAllEmailSubscribers(), [])
  const activeSubscribers = useMemo(() => getActiveEmailSubscribers(), [])
  const sequences = useMemo(() => getEnabledEmailSequences(), [])
  const abTests = useMemo(() => getABTestCampaigns(), [])
  const welcomeTemplates = useMemo(() => getEmailTemplatesByType('welcome'), [])
  const promotionalTemplates = useMemo(() => getEmailTemplatesByType('promotional'), [])
  const abandonedCartTemplates = useMemo(() => getEmailTemplatesByType('abandoned-cart'), [])

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">✉️ Email Marketing</h1>
          <p className="text-gray-600">Manage campaigns, templates, and subscriber lists</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
            <p className="text-sm font-bold text-blue-900 mb-2">Total Subscribers</p>
            <p className="text-3xl font-black text-blue-600">{stats.totalSubscribers}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
            <p className="text-sm font-bold text-green-900 mb-2">Active</p>
            <p className="text-3xl font-black text-green-600">{stats.activeSubscribers}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
            <p className="text-sm font-bold text-purple-900 mb-2">Campaigns</p>
            <p className="text-3xl font-black text-purple-600">{stats.totalCampaigns}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border-2 border-amber-200">
            <p className="text-sm font-bold text-amber-900 mb-2">Avg Open Rate</p>
            <p className="text-3xl font-black text-amber-600">{stats.averageOpenRate.toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
            <p className="text-sm font-bold text-red-900 mb-2">Emails Sent</p>
            <p className="text-3xl font-black text-red-600">{stats.totalEmailsSent.toLocaleString()}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['dashboard', 'campaigns', 'templates', 'sequences', 'subscribers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'campaigns' && '📧 Campaigns'}
              {tab === 'templates' && '📝 Templates'}
              {tab === 'sequences' && '⏳ Sequences'}
              {tab === 'subscribers' && '👥 Subscribers'}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Campaign Performance */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Campaign Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
                    <h3 className="font-bold text-gray-900 mb-2">{campaign.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{campaign.type}</p>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipients:</span>
                        <span className="font-bold text-gray-900">{campaign.recipientCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sent:</span>
                        <span className="font-bold text-gray-900">{campaign.sentCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Open Rate:</span>
                        <span className="font-bold text-blue-600">{campaign.openRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Click Rate:</span>
                        <span className="font-bold text-green-600">{campaign.clickRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversion:</span>
                        <span className="font-bold text-purple-600">{campaign.conversionRate.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-gray-200">
                      <p className="text-xs text-gray-500">Status: <span className="font-bold capitalize">{campaign.status}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* A/B Testing Results */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 A/B Test Results</h2>
              <div className="space-y-4">
                {abTests.map(test => (
                  <div key={test.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                    <h3 className="font-bold text-gray-900 mb-3">{test.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-bold text-gray-600 mb-1">Variant A:</p>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded border-l-4 border-gray-400">{test.variant_a}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-600 mb-1">Variant B (Winner):</p>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded border-l-4 border-green-500 font-bold">{test.variant_b}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-4 rounded">
                      <span className="font-bold text-gray-900">Improvement:</span>
                      <span className="text-2xl font-black text-green-600">+{test.improvement}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Sequence Status */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⏳ Active Email Sequences</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sequences.map(sequence => (
                  <div key={sequence.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-2">{sequence.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Type: <span className="font-bold capitalize">{sequence.type}</span></p>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-bold text-gray-900">Emails: {sequence.emails.length}</p>
                      {sequence.emails.map((email, idx) => (
                        <p key={idx} className="text-xs text-gray-700 ml-4">
                          → {idx + 1}. {email.subject} ({email.delayHours}h delay)
                        </p>
                      ))}
                    </div>

                    <div className="pt-4 border-t-2 border-blue-200">
                      <p className="text-sm">
                        <span className="text-gray-600">Triggered:</span> <span className="font-bold text-blue-600">{sequence.triggeredCount.toLocaleString()} times</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Campaigns</h2>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                + New Campaign
              </button>
            </div>

            <div className="grid gap-4">
              {campaigns.map(campaign => (
                <div
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                  className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-blue-400 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-600">Type: <span className="font-bold capitalize">{campaign.type}</span></p>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-bold text-sm capitalize ${
                      campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'sending' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'scheduled' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>

                  {/* Expanded Details */}
                  {selectedCampaign === campaign.id && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3 border-l-4 border-blue-600">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs font-bold text-gray-600 mb-1">Recipients</p>
                          <p className="text-2xl font-black text-gray-900">{campaign.recipientCount}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-600 mb-1">Sent</p>
                          <p className="text-2xl font-black text-gray-900">{campaign.sentCount}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-600 mb-1">Open Rate</p>
                          <p className="text-2xl font-black text-blue-600">{campaign.openRate.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-600 mb-1">Conversion</p>
                          <p className="text-2xl font-black text-purple-600">{campaign.conversionRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mini Stats */}
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">Opens: <span className="font-bold text-blue-600">{campaign.openRate.toFixed(1)}%</span></span>
                    <span className="text-gray-600">Clicks: <span className="font-bold text-green-600">{campaign.clickRate.toFixed(1)}%</span></span>
                    <span className="text-gray-600">Conversions: <span className="font-bold text-purple-600">{campaign.conversionRate.toFixed(1)}%</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-8">
            {/* Welcome Templates */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎉 Welcome Series Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {welcomeTemplates.map(template => (
                  <div key={template.id} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border-2 border-emerald-200">
                    <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Subject: <span className="font-bold">{template.subject}</span></p>
                    <button className="w-full px-3 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all text-sm">
                      Edit Template
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Promotional Templates */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📢 Promotional Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {promotionalTemplates.map(template => (
                  <div key={template.id} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-200">
                    <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Subject: <span className="font-bold">{template.subject}</span></p>
                    <button className="w-full px-3 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all text-sm">
                      Edit Template
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Abandoned Cart Templates */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🛒 Abandoned Cart Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {abandonedCartTemplates.map(template => (
                  <div key={template.id} className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border-2 border-red-200">
                    <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Subject: <span className="font-bold">{template.subject}</span></p>
                    <button className="w-full px-3 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all text-sm">
                      Edit Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sequences Tab */}
        {activeTab === 'sequences' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Email Sequences</h2>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                + New Sequence
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sequences.map(sequence => (
                <div key={sequence.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-6 border-2 border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{sequence.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{sequence.type} Sequence</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm">
                      Active
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-4 space-y-2">
                    {sequence.emails.map((email, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2 border-b-2 border-gray-200 last:border-0">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm">{email.subject}</p>
                          <p className="text-xs text-gray-600">{email.delayHours}h after trigger</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-700 mb-4">
                    Triggered <span className="font-bold text-blue-600">{sequence.triggeredCount.toLocaleString()} times</span>
                  </p>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                    Edit Sequence
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-2">Total Subscribers</p>
                  <p className="text-3xl font-black text-gray-900">{allSubscribers.length}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-2">Active</p>
                  <p className="text-3xl font-black text-green-600">{activeSubscribers.length}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-2">Unsubscribed</p>
                  <p className="text-3xl font-black text-red-600">{allSubscribers.length - activeSubscribers.length}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-2">Growth Rate</p>
                  <p className="text-3xl font-black text-blue-600">+5.2%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Recent Subscribers</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Subscribed</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Last Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSubscribers.map(subscriber => (
                      <tr key={subscriber.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                        <td className="py-3 px-4 text-gray-900">{subscriber.email}</td>
                        <td className="py-3 px-4 text-gray-900">{subscriber.firstName} {subscriber.lastName}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                            subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {subscriber.lastEmailSent ? new Date(subscriber.lastEmailSent).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
