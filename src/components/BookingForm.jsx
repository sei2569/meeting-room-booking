import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { ROOMS } from '../data/mockData';

const BookingForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      equipment: [],
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        start: initialData.start ? initialData.start.slice(0, 16) : '',
        end: initialData.end ? initialData.end.slice(0, 16) : '',
      });
    } else {
      reset({
        roomId: '1',
        title: '',
        start: '',
        end: '',
        fullName: '',
        employeeId: '',
        position: '',
        department: '',
        type: 'Internal',
        participantCount: 1,
        equipment: [],
        note: '',
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    const room = ROOMS.find(r => r.id === data.roomId);
    onSubmit({
      ...data,
      roomName: room?.name || '',
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
    });
    onClose();
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-sky-blue outline-none transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  const equipmentOptions = ['Projector', 'Whiteboard', 'TV Screen', 'Video Conference', 'Catering'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 m-0">
            {initialData?.id ? 'Edit Booking' : 'New Room Booking'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div className="col-span-2">
              <label className={labelClasses}>Meeting Title</label>
              <input 
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g. Project Kickoff"
                className={inputClasses}
              />
              {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
            </div>

            <div>
              <label className={labelClasses}>Meeting Room</label>
              <select {...register('roomId')} className={inputClasses}>
                {ROOMS.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClasses}>Type</label>
              <select {...register('type')} className={inputClasses}>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Interview">Interview</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Start Date & Time</label>
              <input 
                type="datetime-local"
                {...register('start', { required: 'Start time is required' })}
                className={inputClasses}
              />
              {errors.start && <span className="text-xs text-red-500">{errors.start.message}</span>}
            </div>

            <div>
              <label className={labelClasses}>End Date & Time</label>
              <input 
                type="datetime-local"
                {...register('end', { required: 'End time is required' })}
                className={inputClasses}
              />
              {errors.end && <span className="text-xs text-red-500">{errors.end.message}</span>}
            </div>

            {/* Requester Info */}
            <div>
              <label className={labelClasses}>Full Name</label>
              <input 
                {...register('fullName', { required: 'Name is required' })}
                placeholder="John Doe"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Employee ID</label>
              <input 
                {...register('employeeId', { required: 'Employee ID is required' })}
                placeholder="EMP000"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Position</label>
              <input 
                {...register('position')}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Department</label>
              <input 
                {...register('department')}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Number of Users</label>
              <input 
                type="number"
                {...register('participantCount', { min: 1 })}
                className={inputClasses}
              />
            </div>

            <div className="col-span-2">
              <label className={labelClasses}>Requested Equipment</label>
              <div className="flex flex-wrap gap-3">
                {equipmentOptions.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      value={option}
                      {...register('equipment')}
                      className="rounded border-gray-300 text-sky-blue focus:ring-sky-blue"
                    />
                    <span className="text-sm text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className={labelClasses}>Note</label>
              <textarea 
                {...register('note')}
                rows={3}
                placeholder="Any special requests..."
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-sky-blue hover:bg-sky-blue/90 rounded-lg shadow-sm transition-colors"
            >
              {initialData?.id ? 'Update Booking' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
