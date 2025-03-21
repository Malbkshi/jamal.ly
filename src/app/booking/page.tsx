'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaWhatsapp } from 'react-icons/fa';
import PageTemplate from '@/components/PageTemplate';

const services = [
  { id: 1, name: 'العناية بالبشرة' },
  { id: 2, name: 'إزالة الشعر' },
  { id: 3, name: 'تنظيف البشرة' },
  { id: 4, name: 'علاج حب الشباب' },
  { id: 5, name: 'تفتيح البشرة' },
  { id: 6, name: 'نضارة البشرة' },
];

const timeSlots = [
  '10:00 صباحاً',
  '11:00 صباحاً',
  '12:00 ظهراً',
  '1:00 مساءً',
  '2:00 مساءً',
  '3:00 مساءً',
  '4:00 مساءً',
  '5:00 مساءً',
  '6:00 مساءً',
  '7:00 مساءً',
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    nextStep();
  };

  return (
    <PageTemplate>
      {/* Hero Section */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">احجز موعدك الآن</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              اختاري الخدمة المناسبة واحجزي موعدك بسهولة
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <FaCalendarAlt />
                </div>
                <span className={`mt-2 text-sm ${
                  step >= 1 ? 'text-primary font-medium' : 'text-gray-500'
                }`}>
                  اختيار الخدمة
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <FaClock />
                </div>
                <span className={`mt-2 text-sm ${
                  step >= 2 ? 'text-primary font-medium' : 'text-gray-500'
                }`}>
                  اختيار الموعد
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <FaUser />
                </div>
                <span className={`mt-2 text-sm ${
                  step >= 3 ? 'text-primary font-medium' : 'text-gray-500'
                }`}>
                  معلومات الاتصال
                </span>
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-white rounded-xl shadow-md p-8">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">اختاري الخدمة</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {services.map((service) => (
                      <div key={service.id} className="relative">
                        <input
                          type="radio"
                          id={`service-${service.id}`}
                          name="service"
                          value={service.name}
                          className="peer hidden"
                          onChange={handleChange}
                          checked={formData.service === service.name}
                        />
                        <label
                          htmlFor={`service-${service.id}`}
                          className="block p-4 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50"
                        >
                          <div className="font-medium">{service.name}</div>
                        </label>
                        <div className="absolute top-4 left-4 text-primary opacity-0 peer-checked:opacity-100">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!formData.service}
                      className={`btn-primary ${!formData.service ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      التالي
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">اختاري الموعد</h2>
                  <div className="mb-6">
                    <label htmlFor="date" className="block text-foreground/80 mb-2">
                      التاريخ
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-foreground/80 mb-2">
                      الوقت
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((time, index) => (
                        <div key={index} className="relative">
                          <input
                            type="radio"
                            id={`time-${index}`}
                            name="time"
                            value={time}
                            className="peer hidden"
                            onChange={handleChange}
                            checked={formData.time === time}
                          />
                          <label
                            htmlFor={`time-${index}`}
                            className="block p-2 text-center bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50"
                          >
                            {time}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="bg-gray-200 text-foreground hover:bg-gray-300 transition-colors py-2 px-4 rounded-xl"
                    >
                      السابق
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!formData.date || !formData.time}
                      className={`btn-primary ${
                        !formData.date || !formData.time ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      التالي
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-primary mb-6">معلومات الاتصال</h2>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label htmlFor="name" className="block text-foreground/80 mb-1">
                        الاسم
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-foreground/80 mb-1">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-foreground/80 mb-1">
                        البريد الإلكتروني (اختياري)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-foreground/80 mb-1">
                        ملاحظات إضافية (اختياري)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 text-foreground hover:bg-gray-300 transition-colors py-2 px-4 rounded-xl"
                    >
                      السابق
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      تأكيد الحجز
                    </button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-4">تم تأكيد الحجز بنجاح!</h2>
                  <p className="text-foreground/80 mb-6">
                    شكراً لك! تم تأكيد حجزك بنجاح. سنتواصل معك قريباً لتأكيد موعدك.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/"
                      className="btn-primary"
                    >
                      العودة للرئيسية
                    </a>
                    <a
                      href="https://wa.me/218924275555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-[#25D366] text-white py-2 px-4 rounded-xl hover:bg-[#128C7E] transition-colors"
                    >
                      <FaWhatsapp className="ml-2" />
                      تواصل معنا عبر واتساب
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
} 