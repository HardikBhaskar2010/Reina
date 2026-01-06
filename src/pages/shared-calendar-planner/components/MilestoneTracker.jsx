import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MilestoneTracker = ({ milestones, onUpdateProgress, onAddMilestone }) => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const mockMilestones = [
    {
      id: 1,
      title: "Save for Dream Vacation",
      description: "Planning our romantic getaway to Paris for our anniversary",
      targetDate: "2025-12-15",
      progress: 65,
      category: "travel",
      tasks: [
        { id: 1, title: "Research destinations", completed: true },
        { id: 2, title: "Set savings goal", completed: true },
        { id: 3, title: "Book flights", completed: false },
        { id: 4, title: "Reserve hotel", completed: false },
        { id: 5, title: "Plan itinerary", completed: false }
      ],
      targetAmount: 5000,
      currentAmount: 3250
    },
    {
      id: 2,
      title: "Move in Together",
      description: "Finding and setting up our first shared home",
      targetDate: "2025-06-01",
      progress: 40,
      category: "relationship",
      tasks: [
        { id: 1, title: "Discuss living preferences", completed: true },
        { id: 2, title: "Set budget range", completed: true },
        { id: 3, title: "Start apartment hunting", completed: false },
        { id: 4, title: "Apply for places", completed: false },
        { id: 5, title: "Plan moving logistics", completed: false }
      ]
    },
    {
      id: 3,
      title: "Learn Cooking Together",
      description: "Master 20 new recipes as a couple",
      targetDate: "2025-08-30",
      progress: 25,
      category: "hobby",
      tasks: [
        { id: 1, title: "Choose cuisine types", completed: true },
        { id: 2, title: "Buy cooking equipment", completed: true },
        { id: 3, title: "Cook 5 recipes", completed: false },
        { id: 4, title: "Cook 10 recipes", completed: false },
        { id: 5, title: "Cook 20 recipes", completed: false }
      ],
      recipesCompleted: 5,
      recipesTarget: 20
    }
  ];

  const activeMilestones = milestones?.length > 0 ? milestones : mockMilestones;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateStr) => {
    const today = new Date();
    const targetDate = new Date(dateStr);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months left`;
    return `${Math.ceil(diffDays / 365)} years left`;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'travel': return 'Plane';
      case 'relationship': return 'Heart';
      case 'hobby': return 'Star';
      case 'financial': return 'DollarSign';
      case 'health': return 'Activity';
      default: return 'Target';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'travel': return 'text-blue-500';
      case 'relationship': return 'text-accent';
      case 'hobby': return 'text-purple-500';
      case 'financial': return 'text-green-500';
      case 'health': return 'text-orange-500';
      default: return 'text-primary';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-muted';
  };

  const toggleExpanded = (milestoneId) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
  };

  const handleTaskToggle = (milestoneId, taskId) => {
    // Mock function - in real app would update task completion
    console.log(`Toggle task ${taskId} for milestone ${milestoneId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Milestone Tracker
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Track your relationship goals and achievements together
          </p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddMilestone}
        >
          Add Milestone
        </Button>
      </div>
      {/* Milestones List */}
      <div className="space-y-4">
        {activeMilestones?.map((milestone) => (
          <div
            key={milestone?.id}
            className="glass-card rounded-2xl shadow-soft border border-border/20 overflow-hidden hover:shadow-medium transition-all duration-300"
          >
            {/* Milestone Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    ${milestone?.category === 'travel' ? 'bg-blue-500/20' : ''}
                    ${milestone?.category === 'relationship' ? 'bg-accent/20' : ''}
                    ${milestone?.category === 'hobby' ? 'bg-purple-500/20' : ''}
                    ${milestone?.category === 'financial' ? 'bg-green-500/20' : ''}
                    ${milestone?.category === 'health' ? 'bg-orange-500/20' : ''}
                    ${!milestone?.category ? 'bg-primary/20' : ''}
                  `}>
                    <Icon 
                      name={getCategoryIcon(milestone?.category)} 
                      size={20} 
                      className={getCategoryColor(milestone?.category)} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-body text-lg font-semibold text-foreground mb-1">
                      {milestone?.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      {milestone?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="font-caption text-muted-foreground">
                          {formatDate(milestone?.targetDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="font-caption text-muted-foreground">
                          {getDaysUntil(milestone?.targetDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="font-mono text-lg font-bold text-primary">
                      {milestone?.progress}%
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      Complete
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpanded(milestone?.id)}
                    className="p-2 rounded-lg hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className={`transition-transform duration-300 ${
                        expandedMilestone === milestone?.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-sm font-medium text-foreground">Progress</span>
                  {milestone?.targetAmount && (
                    <span className="font-caption text-xs text-muted-foreground">
                      ${milestone?.currentAmount?.toLocaleString()} / ${milestone?.targetAmount?.toLocaleString()}
                    </span>
                  )}
                  {milestone?.recipesCompleted && (
                    <span className="font-caption text-xs text-muted-foreground">
                      {milestone?.recipesCompleted} / {milestone?.recipesTarget} recipes
                    </span>
                  )}
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(milestone?.progress)}`}
                    style={{ width: `${milestone?.progress}%` }}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              {milestone?.tasks && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {milestone?.tasks?.filter(task => task?.completed)?.length} completed
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Circle" size={14} className="text-muted-foreground" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {milestone?.tasks?.filter(task => !task?.completed)?.length} remaining
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit2"
                    iconPosition="left"
                    onClick={() => onUpdateProgress && onUpdateProgress(milestone?.id)}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {expandedMilestone === milestone?.id && milestone?.tasks && (
              <div className="px-6 pb-6 border-t border-border/20 bg-muted/5">
                <div className="pt-4">
                  <h4 className="font-body text-sm font-semibold text-foreground mb-3">
                    Tasks & Checklist
                  </h4>
                  <div className="space-y-3">
                    {milestone?.tasks?.map((task) => (
                      <div
                        key={task?.id}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors duration-300"
                      >
                        <button
                          onClick={() => handleTaskToggle(milestone?.id, task?.id)}
                          className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${task?.completed 
                              ? 'bg-success border-success text-white' :'border-muted-foreground hover:border-primary'
                            }
                          `}
                        >
                          {task?.completed && <Icon name="Check" size={12} />}
                        </button>
                        <span className={`
                          font-body text-sm flex-1 transition-all duration-300
                          ${task?.completed 
                            ? 'text-muted-foreground line-through' 
                            : 'text-foreground'
                          }
                        `}>
                          {task?.title}
                        </span>
                        {task?.completed && (
                          <Icon name="CheckCircle" size={16} className="text-success" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {activeMilestones?.length === 0 && (
        <div className="text-center py-12 glass-card rounded-2xl">
          <Icon name="Target" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-body text-lg font-medium text-foreground mb-2">No milestones yet</h3>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Set relationship goals and track your progress together
          </p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddMilestone}
          >
            Create Your First Milestone
          </Button>
        </div>
      )}
    </div>
  );
};

export default MilestoneTracker;