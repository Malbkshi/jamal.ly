'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/lib/supabase';
import PageTemplate from '@/components/PageTemplate';
import { toast } from 'react-hot-toast';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings...');
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Fetched bookings:', data);
      setBookings(data || []);
    } catch (error) {
      console.error('Error in fetchBookings:', error);
      toast.error('حدث خطأ أثناء جلب الحجوزات');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`تم ${status === 'approved' ? 'قبول' : 'رفض'} الحجز بنجاح`);
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('حدث خطأ أثناء تحديث حالة الحجز');
    }
  };

  if (loading) {
    return (
      <PageTemplate>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">إدارة الحجوزات</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخدمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ والوقت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.name}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                    {booking.email && (
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'approved'
                        ? 'مقبول'
                        : booking.status === 'rejected'
                        ? 'مرفوض'
                        : 'قيد الانتظار'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          رفض
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageTemplate>
  );
} 