// ApplicationsSection.jsx Section جوا صفحة Home بيعرض شبكة (grid) من 9 تدريبات منشورة كحد أقصى. لفلترة النتائج SearchBar بيستخدم - عند التحميل الأولي (internshipService.getPublished(9 بيستخدم - عند البحث (internshipService.searchPublished(q بيستخدم - InternshipCard بيعرض كل نتيجة عن طريق -
//

import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import InternshipCard from '../../common/InternshipCards/InternshipCard';
import * as internshipService from '../../../api/internshipService';
import './ApplicationsSection.css';

const ApplicationsSection = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // دالة جلب البيانات الأساسية (9 تدريبات منشورة كحد أقصى)
  const fetchInitialInternships = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await internshipService.getPublished(9);
      setInternships(data || []);
    } catch (err) {
      setError('فشل في تحميل التدريبات المتاحة.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialInternships();
  }, []);

  // دالة البحث والفلترة
  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchInitialInternships();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await internshipService.searchPublished(query);
      setInternships(data || []);
    } catch (err) {
      setError('حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="applications" className="applications-section">
      <div className="section-header">
        <h2>التدريبات المتاحة</h2>
        <p>اكتشف فرص التدريب العملي وانطلق في مسيرتك المهنية</p>
      </div>

      {/* مكون البحث */}
      <SearchBar onSearch={handleSearch} />

      {/* عرض حالات التحميل والأخطاء أو البيانات */}
      {loading ? (
        <div className="section-message">جاري تحميل الفرص المتاحة...</div>
      ) : error ? (
        <div className="section-message error">{error}</div>
      ) : internships.length === 0 ? (
        <div className="section-message">لا توجد تدريبات مطابقة لبحثك حالياً.</div>
      ) : (
        <div className="internships-grid">
          {internships.map((internship) => (
            <InternshipCard 
              key={internship._id || internship.id} 
              internship={internship} 
              onClick={() => window.location.href = `/internship/${internship._id || internship.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ApplicationsSection;