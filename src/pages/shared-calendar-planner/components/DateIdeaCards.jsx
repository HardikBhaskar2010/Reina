import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateIdeaCards = ({ onSelectIdea, onAddToCalendar }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const dateIdeas = [
    {
      id: 1,
      title: "Candlelit Dinner at Home",
      category: "romantic",
      description: "Create an intimate atmosphere with homemade cuisine, soft lighting, and your favorite playlist.",
      duration: "2-3 hours",
      budget: "$$",
      difficulty: "Easy",
      preparation: [
        "Plan a 3-course menu",
        "Set up candles and dim lighting",
        "Create a romantic playlist",
        "Prepare ingredients in advance"
      ],
      mood: "romantic",
      season: "all",
      image: "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg"
    },
    {
      id: 2,
      title: "Sunrise Hiking Adventure",
      category: "outdoor",
      description: "Start your day together watching the sunrise from a beautiful hiking trail with packed breakfast.",
      duration: "4-5 hours",
      budget: "$",
      difficulty: "Moderate",
      preparation: [
        "Check weather conditions",
        "Pack breakfast and water",
        "Wear comfortable hiking shoes",
        "Bring a blanket for sitting"
      ],
      mood: "adventurous",
      season: "spring,summer,fall",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg"
    },
    {
      id: 3,
      title: "Movie Marathon & Blanket Fort",
      category: "cozy",
      description: "Build a cozy blanket fort and binge-watch your favorite romantic comedies with homemade popcorn.",
      duration: "4-6 hours",
      budget: "$",
      difficulty: "Easy",
      preparation: [
        "Gather blankets and pillows",
        "Choose 3-4 movies together",
        "Prepare snacks and drinks",
        "Set up fairy lights for ambiance"
      ],
      mood: "cozy",
      season: "all",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
    },
    {
      id: 4,
      title: "Cooking Class Together",
      category: "creative",
      description: "Learn to cook a new cuisine together, either at home following online tutorials or at a local class.",
      duration: "3-4 hours",
      budget: "$$$",
      difficulty: "Moderate",
      preparation: [
        "Choose a cuisine to learn",
        "Buy fresh ingredients",
        "Set up cooking workspace",
        "Find online tutorials or book a class"
      ],
      mood: "playful",
      season: "all",
      image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
    },
    {
      id: 5,
      title: "Stargazing Picnic",
      category: "romantic",
      description: "Pack a midnight picnic and find a quiet spot away from city lights to watch the stars together.",
      duration: "3-4 hours",
      budget: "$$",
      difficulty: "Easy",
      preparation: [
        "Check weather and moon phase",
        "Pack warm blankets",
        "Prepare finger foods",
        "Download stargazing app"
      ],
      mood: "romantic",
      season: "summer,fall",
      image: "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg"
    },
    {
      id: 6,
      title: "Art Gallery & Coffee Date",
      category: "cultural",
      description: "Explore local art galleries or museums followed by deep conversations over specialty coffee.",
      duration: "3-4 hours",
      budget: "$$",
      difficulty: "Easy",
      preparation: [
        "Research local galleries",
        "Check opening hours",
        "Find a cozy coffee shop nearby",
        "Prepare conversation topics about art"
      ],
      mood: "intellectual",
      season: "all",
      image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Ideas', icon: 'Heart' },
    { id: 'romantic', label: 'Romantic', icon: 'Heart' },
    { id: 'outdoor', label: 'Outdoor', icon: 'Mountain' },
    { id: 'cozy', label: 'Cozy', icon: 'Home' },
    { id: 'creative', label: 'Creative', icon: 'Palette' },
    { id: 'cultural', label: 'Cultural', icon: 'Camera' }
  ];

  const filteredIdeas = selectedCategory === 'all' 
    ? dateIdeas 
    : dateIdeas?.filter(idea => idea?.category === selectedCategory);

  const toggleFavorite = (ideaId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites?.has(ideaId)) {
      newFavorites?.delete(ideaId);
    } else {
      newFavorites?.add(ideaId);
    }
    setFavorites(newFavorites);
  };

  const getBudgetIcon = (budget) => {
    switch (budget) {
      case '$': return 'DollarSign';
      case '$$': return 'DollarSign';
      case '$$$': return 'DollarSign';
      default: return 'DollarSign';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success';
      case 'Moderate': return 'text-warning';
      case 'Hard': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Date Ideas
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Discover romantic activities perfect for you and your partner
          </p>
        </div>
        <Button
          variant="outline"
          iconName="Shuffle"
          iconPosition="left"
          onClick={() => onSelectIdea(dateIdeas?.[Math.floor(Math.random() * dateIdeas?.length)])}
        >
          Surprise Me
        </Button>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-xl font-body text-sm font-medium
              transition-all duration-300 hover:scale-105
              ${selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-gentle'
                : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-border/20'
              }
            `}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas?.map((idea) => (
          <div
            key={idea?.id}
            className="group glass-card rounded-2xl overflow-hidden shadow-soft border border-border/20 hover:shadow-medium hover:scale-105 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={idea?.image}
                alt={idea?.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(idea?.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={favorites?.has(idea?.id) ? 'text-accent fill-current' : 'text-white'} 
                />
              </button>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-primary/80 backdrop-blur-sm rounded-lg">
                <span className="font-caption text-xs font-medium text-white capitalize">
                  {idea?.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-body text-lg font-semibold text-foreground mb-2">
                {idea?.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                {idea?.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="font-caption text-xs text-muted-foreground">{idea?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name={getBudgetIcon(idea?.budget)} size={14} className="text-muted-foreground" />
                    <span className="font-caption text-xs text-muted-foreground">{idea?.budget}</span>
                  </div>
                </div>
                <span className={`font-caption text-xs font-medium ${getDifficultyColor(idea?.difficulty)}`}>
                  {idea?.difficulty}
                </span>
              </div>

              {/* Preparation Preview */}
              <div className="mb-4">
                <h4 className="font-body text-sm font-medium text-foreground mb-2">Preparation:</h4>
                <ul className="space-y-1">
                  {idea?.preparation?.slice(0, 2)?.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="font-caption text-xs text-muted-foreground">{step}</span>
                    </li>
                  ))}
                  {idea?.preparation?.length > 2 && (
                    <li className="font-caption text-xs text-muted-foreground ml-3">
                      +{idea?.preparation?.length - 2} more steps
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => onAddToCalendar(idea)}
                  className="flex-1"
                >
                  Schedule
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => onSelectIdea(idea)}
                  className="flex-1"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredIdeas?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-body text-lg font-medium text-foreground mb-2">No ideas found</h3>
          <p className="font-body text-sm text-muted-foreground">
            Try selecting a different category or check back later for new suggestions
          </p>
        </div>
      )}
    </div>
  );
};

export default DateIdeaCards;