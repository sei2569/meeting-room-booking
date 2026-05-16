import React from 'react';
import { Calendar, List, Plus, LayoutGrid } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Layout = ({ children, activeView, setActiveView, onAddClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sky-blue rounded-lg text-white">
                <LayoutGrid size={24} />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 m-0 tracking-tight block">
                Meeting Room Booking
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                <button
                  onClick={() => setActiveView('calendar')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    activeView === 'calendar' 
                      ? "bg-white text-sky-blue shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Calendar size={18} />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    activeView === 'list' 
                      ? "bg-white text-sky-blue shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <List size={18} />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>

              <button
                onClick={onAddClick}
                className="flex items-center gap-2 bg-sky-blue hover:bg-sky-blue/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Book Room</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full box-border">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Meeting Room Booking System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
