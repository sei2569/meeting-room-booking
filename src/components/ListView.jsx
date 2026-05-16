import React from 'react';
import { format } from 'date-fns';
import { User, Users, Clock, Briefcase, MapPin } from 'lucide-react';
import { ROOMS } from '../data/mockData';

const ListView = ({ bookings, onEditClick }) => {
  const getRoomColor = (roomId) => {
    return ROOMS.find((r) => r.id === roomId)?.color || '#6894CE';
  };

  return (
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        bookings
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
          .map((booking) => (
            <div
              key={booking.id}
              onClick={() => onEditClick(booking)}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-sky-blue/50 transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-2 h-16 rounded-full mt-1" 
                    style={{ backgroundColor: getRoomColor(booking.roomId) }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {booking.roomName}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-medium text-sky-blue bg-sky-blue/10 px-2 py-0.5 rounded">
                        {booking.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-blue transition-colors">
                      {booking.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-gray-400" />
                        <span>{format(new Date(booking.start), 'MMM d, yyyy')}</span>
                        <span className="mx-1 text-gray-300">|</span>
                        <span>{format(new Date(booking.start), 'HH:mm')} - {format(new Date(booking.end), 'HH:mm')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={16} className="text-gray-400" />
                        <span>{booking.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-gray-400" />
                        <span>{booking.participantCount} users</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Briefcase size={16} className="text-gray-400" />
                    <span>{booking.department}</span>
                  </div>
                  <div className="text-xs text-gray-400 max-w-[200px] truncate">
                    {booking.equipment.join(', ') || 'No equipment requested'}
                  </div>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default ListView;
