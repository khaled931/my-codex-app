'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { ConsultationRequest, ConsultationStatus, SYRIAN_CITIES } from '@/types';
import { formatDate } from '@/lib/utils';
import { FiEye, FiDownload, FiSave } from 'react-icons/fi';

export default function AdminPage() {
  const { t, language } = useLanguage();
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');

  const fetchRequests = async (username: string, password: string) => {
    try {
      const auth = btoa(`${username}:${password}`);
      const response = await fetch('/api/admin/requests', {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      if (response.status === 401) {
        setAuthError('Invalid credentials');
        setAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await response.json();
      setRequests(data);
      setAuthenticated(true);
      setAuthError('');
      localStorage.setItem('adminAuth', auth);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setAuthError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      const decoded = atob(savedAuth);
      const [username, password] = decoded.split(':');
      fetchRequests(username, password);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchRequests(credentials.username, credentials.password);
  };

  const handleUpdateStatus = async (id: string, status: ConsultationStatus, notes?: string) => {
    try {
      const auth = localStorage.getItem('adminAuth');
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({ status, admin_notes: notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      const updated = await response.json();
      setRequests(prev => prev.map(r => r.id === id ? updated : r));
      if (selectedRequest?.id === id) {
        setSelectedRequest(updated);
      }
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request');
    }
  };

  const getStatusBadge = (status: ConsultationStatus) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {t(`admin.status.${status}`)}
      </span>
    );
  };

  const getCityLabel = (cityValue: string | null) => {
    if (!cityValue) return '-';
    const city = SYRIAN_CITIES.find(c => c.value === cityValue);
    return city ? (language === 'ar' ? city.label_ar : city.label_en) : cityValue;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('admin.title')}
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'اسم المستخدم' : 'Username'}
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                {authError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {language === 'ar' ? 'دخول' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.title')}</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuth');
              setAuthenticated(false);
            }}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {language === 'ar' ? 'خروج' : 'Logout'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('admin.requests')} ({requests.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        {t('admin.date')}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        {t('admin.name')}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        {t('admin.city')}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        {t('admin.view')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {requests.map(request => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(request.created_at, language)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {request.full_name || (language === 'ar' ? 'غير محدد' : 'N/A')}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {getCityLabel(request.city)}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(request.status)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <FiEye className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Request Detail */}
          <div className="lg:col-span-1">
            {selectedRequest ? (
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
                </h3>

                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    {t('admin.date')}
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(selectedRequest.created_at, language)}
                  </p>
                </div>

                {selectedRequest.full_name && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase">
                      {t('admin.name')}
                    </label>
                    <p className="text-sm text-gray-900">{selectedRequest.full_name}</p>
                  </div>
                )}

                {selectedRequest.email && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase">Email</label>
                    <p className="text-sm text-gray-900">{selectedRequest.email}</p>
                  </div>
                )}

                {selectedRequest.phone && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase">
                      {language === 'ar' ? 'الهاتف' : 'Phone'}
                    </label>
                    <p className="text-sm text-gray-900">{selectedRequest.phone}</p>
                  </div>
                )}

                {selectedRequest.city && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase">
                      {t('admin.city')}
                    </label>
                    <p className="text-sm text-gray-900">{getCityLabel(selectedRequest.city)}</p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    {t('admin.message')}
                  </label>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedRequest.message}
                  </p>
                </div>

                {selectedRequest.image_url && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                      {t('admin.attachment')}
                    </label>
                    <img
                      src={selectedRequest.image_url}
                      alt="Attachment"
                      className="w-full rounded-lg mb-2"
                    />
                    <a
                      href={selectedRequest.image_url}
                      download
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
                    >
                      <FiDownload /> {t('admin.download')}
                    </a>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                    Status
                  </label>
                  <select
                    value={selectedRequest.status}
                    onChange={e =>
                      handleUpdateStatus(selectedRequest.id, e.target.value as ConsultationStatus)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="new">{t('admin.status.new')}</option>
                    <option value="in_review">{t('admin.status.in_review')}</option>
                    <option value="replied">{t('admin.status.replied')}</option>
                    <option value="closed">{t('admin.status.closed')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                    {t('admin.notes')}
                  </label>
                  <textarea
                    value={selectedRequest.admin_notes || ''}
                    onChange={e => {
                      setSelectedRequest({
                        ...selectedRequest,
                        admin_notes: e.target.value,
                      });
                    }}
                    rows={4}
                    placeholder={t('admin.notes.placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedRequest.id,
                      selectedRequest.status,
                      selectedRequest.admin_notes || undefined
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <FiSave /> {t('admin.save')}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
                {language === 'ar'
                  ? 'اختر طلباً لعرض التفاصيل'
                  : 'Select a request to view details'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
