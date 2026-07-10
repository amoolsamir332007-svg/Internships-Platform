
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from "../../../api/authService";
import './StudentSidebar.css';

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('خطأ أثناء تسجيل الخروج:', error);
    }
  };

  return (
    <aside className="student-sidebar">
      <div className="sidebar-brand">
        <h2>بوابة الطالب</h2>
      </div>
      
      <nav className="sidebar-menu">
        <NavLink 
          to="/dashboard" 
          end 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
        >
          <span className="menu-icon">📊</span>
          <span className="menu-text">لوحة التحكم</span>
        </NavLink>

        <NavLink 
          to="/dashboard/applications" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
        >
          <span className="menu-icon">💼</span>
          <span className="menu-text">طلبات التقديم</span>
        </NavLink>

        <NavLink 
          to="/dashboard/profile" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
        >
          <span className="menu-icon">👤</span>
          <span className="menu-text">الملف الشخصي</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="menu-icon">🚪</span>
          <span className="menu-text">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;