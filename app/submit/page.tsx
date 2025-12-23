'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useLanguage } from '@/lib/language-context';
import { SYRIAN_CITIES } from '@/types';
import { validateEmail, validateFileType, validateFileSize } from '@/lib/utils';
import { FiUpload, FiX, FiCheckCircle } from 'react-icons/fi';

export default function SubmitPage() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    message: '',
    honeypot: '', // Spam protection
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFileType(file)) {
      alert(language === 'ar' 
        ? 'الرجاء اختيار صورة بصيغة JPG أو PNG أو WEBP' 
        : 'Please select a JPG, PNG, or WEBP image'
      );
      return;
    }

    if (!validateFileSize(file)) {
      alert(language === 'ar'
        ? 'حجم الملف يجب أن لا يتجاوز 10 ميغابايت'
        : 'File size must not exceed 10MB'
      );
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Honeypot check
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
      setError(language === 'ar' 
        ? 'الرجاء كتابة رسالة لا تقل عن 10 أحرف' 
        : 'Please enter a message with at least 10 characters'
      );
      return;
    }

    // Validate email if provided
    if (formData.email && !validateEmail(formData.email)) {
      setError(language === 'ar'
        ? 'الرجاء إدخال بريد إلكتروني صحيح'
        : 'Please enter a valid email address'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('full_name', formData.fullName);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('city', formData.city);
      submitData.append('message', formData.message);
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      const response = await fetch('/api/consultation', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }

      const result = await response.json();
      setReferenceId(result.id);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        message: '',
        honeypot: '',
      });
      setImageFile(null);
      setImagePreview('');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('submit.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <FiCheckCircle className="text-6xl text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('submit.success.title')}
            </h1>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">{t('submit.success.reference')}</p>
              <p className="text-2xl font-mono font-bold text-green-600">
                {referenceId.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <p className="text-gray-600 mb-8">
              {t('submit.success.message')}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {t('submit.success.new')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('submit.title')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('submit.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ position: 'absolute', left: '-9999px' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('submit.name')}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('submit.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('submit.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                {t('submit.city')}
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{t('submit.city.select')}</option>
                {SYRIAN_CITIES.map(city => (
                  <option key={city.value} value={city.value}>
                    {language === 'ar' ? city.label_ar : city.label_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('submit.image')}
              </label>
              {!imagePreview ? (
                <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <div className="text-center">
                    <FiUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{t('submit.image.help')}</p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('submit.message')} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                placeholder={t('submit.message.placeholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Privacy Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                {t('submit.privacy')}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('submit.sending') : t('submit.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
