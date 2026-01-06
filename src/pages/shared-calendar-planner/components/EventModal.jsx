import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventModal = ({ isOpen, onClose, onSave, event, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'date',
    location: '',
    reminder: '1day',
    rsvp: {
      partner1: false,
      partner2: false
    },
    recurring: 'none',
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        time: event?.time || '',
        location: event?.location || '',
        reminder: event?.reminder || '1day',
        recurring: event?.recurring || 'none',
        priority: event?.priority || 'medium'
      });
    } else if (selectedDate) {
      const today = new Date();
      const dateStr = `${today?.getFullYear()}-${String(today?.getMonth() + 1)?.padStart(2, '0')}-${String(selectedDate)?.padStart(2, '0')}`;
      setFormData(prev => ({
        ...prev,
        date: dateStr,
        rsvp: {
          partner1: false,
          partner2: false
        }
      }));
    }
  }, [event, selectedDate]);

  const eventTypes = [
    { value: 'date', label: 'Date Night', icon: 'Heart' },
    { value: 'anniversary', label: 'Anniversary', icon: 'Heart' },
    { value: 'milestone', label: 'Milestone', icon: 'Star' },
    { value: 'reminder', label: 'Reminder', icon: 'Bell' },
    { value: 'travel', label: 'Travel', icon: 'Plane' },
    { value: 'celebration', label: 'Celebration', icon: 'PartyPopper' }
  ];

  const reminderOptions = [
    { value: 'none', label: 'No Reminder' },
    { value: '15min', label: '15 minutes before' },
    { value: '1hour', label: '1 hour before' },
    { value: '1day', label: '1 day before' },
    { value: '1week', label: '1 week before' }
  ];

  const recurringOptions = [
    { value: 'none', label: 'No Repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRSVPChange = (partner, checked) => {
    setFormData(prev => ({
      ...prev,
      rsvp: {
        ...prev?.rsvp,
        [partner]: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Event title is required';
    }
    
    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }
    
    if (formData?.type === 'anniversary' && !formData?.description?.trim()) {
      newErrors.description = 'Anniversary description is recommended';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const eventData = {
      ...formData,
      id: event?.id || Date.now(),
      createdAt: event?.createdAt || new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };

    onSave(eventData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'date',
      location: '',
      reminder: '1day',
      rsvp: {
        partner1: false,
        partner2: false
      },
      recurring: 'none',
      priority: 'medium'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-90 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] glass-card rounded-2xl shadow-floating border border-border/30 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {event ? 'Edit Event' : 'Create New Event'}
                </h2>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Plan something special together
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Event Title"
                    type="text"
                    placeholder="Enter event title..."
                    value={formData?.title}
                    onChange={(e) => handleInputChange('title', e?.target?.value)}
                    error={errors?.title}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Date"
                    type="date"
                    value={formData?.date}
                    onChange={(e) => handleInputChange('date', e?.target?.value)}
                    error={errors?.date}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Time (Optional)"
                    type="time"
                    value={formData?.time}
                    onChange={(e) => handleInputChange('time', e?.target?.value)}
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-3">
                  Event Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {eventTypes?.map((type) => (
                    <button
                      key={type?.value}
                      type="button"
                      onClick={() => handleInputChange('type', type?.value)}
                      className={`
                        flex items-center space-x-2 p-3 rounded-xl border transition-all duration-300
                        ${formData?.type === type?.value
                          ? 'bg-primary/20 border-primary/50 text-primary' :'bg-card/50 border-border/20 text-muted-foreground hover:text-foreground hover:bg-primary/5'
                        }
                      `}
                    >
                      <Icon name={type?.icon} size={16} />
                      <span className="font-body text-sm font-medium">{type?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add event details, notes, or special instructions..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-input border border-border/30 rounded-lg font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                />
                {errors?.description && (
                  <p className="mt-1 font-caption text-xs text-error">{errors?.description}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <Input
                  label="Location (Optional)"
                  type="text"
                  placeholder="Where will this take place?"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                />
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select
                    label="Reminder"
                    options={reminderOptions}
                    value={formData?.reminder}
                    onChange={(value) => handleInputChange('reminder', value)}
                  />
                </div>

                <div>
                  <Select
                    label="Repeat"
                    options={recurringOptions}
                    value={formData?.recurring}
                    onChange={(value) => handleInputChange('recurring', value)}
                  />
                </div>

                <div>
                  <Select
                    label="Priority"
                    options={priorityOptions}
                    value={formData?.priority}
                    onChange={(value) => handleInputChange('priority', value)}
                  />
                </div>
              </div>

              {/* RSVP */}
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-3">
                  RSVP Status
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData?.rsvp?.partner1}
                      onChange={(e) => handleRSVPChange('partner1', e?.target?.checked)}
                      className="w-4 h-4 text-primary bg-input border-border/30 rounded focus:ring-primary/50 focus:ring-2"
                    />
                    <span className="font-body text-sm text-foreground">You</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData?.rsvp?.partner2}
                      onChange={(e) => handleRSVPChange('partner2', e?.target?.checked)}
                      className="w-4 h-4 text-primary bg-input border-border/30 rounded focus:ring-primary/50 focus:ring-2"
                    />
                    <span className="font-body text-sm text-foreground">Partner</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border/20">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Save"
                iconPosition="left"
              >
                {event ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventModal;