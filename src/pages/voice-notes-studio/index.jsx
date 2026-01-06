import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecordingControls from './components/RecordingControls';
import WaveformVisualizer from './components/WaveformVisualizer';
import VoiceNotesList from './components/VoiceNotesList';
import PlaybackControls from './components/PlaybackControls';
import TranscriptionOverlay from './components/TranscriptionOverlay';
import AudioEffectsPanel from './components/AudioEffectsPanel';

const VoiceNotesStudio = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);
  const [showEffectsPanel, setShowEffectsPanel] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [audioEffects, setAudioEffects] = useState({
    noiseReduction: 0,
    volumeBoost: 0,
    clarity: 0,
    reverb: 0,
    echo: 0,
    pitch: 0,
    lowPass: 20000,
    highPass: 20,
    bandPass: 1000
  });

  // Mock voice notes data
  const [voiceNotes] = useState([
    {
      id: 1,
      title: "Good Morning Love",
      date: "2025-01-05",
      duration: 45,
      transcription: "Good morning my beautiful love. I hope you have the most amazing day ahead. I can't wait to see you tonight and hold you in my arms. You mean everything to me.",
      mood: "romantic",
      isFavorite: true,
      hasTranscription: true,
      audioData: Array.from({ length: 100 }, () => Math.random())
    },
    {
      id: 2,
      title: "Lunch Break Thoughts",
      date: "2025-01-04",
      duration: 32,
      transcription: "Just thinking about you during my lunch break. The way you smiled this morning made my entire day brighter. I love how you make even the simplest moments feel magical.",
      mood: "happy",
      isFavorite: false,
      hasTranscription: true,
      audioData: Array.from({ length: 100 }, () => Math.random())
    },
    {
      id: 3,
      title: "Bedtime Whispers",
      date: "2025-01-03",
      duration: 67,
      transcription: "Sweet dreams my darling. As I lay here thinking about our future together, I feel so grateful for every moment we share. Sleep well knowing you are loved beyond measure.",
      mood: "calm",
      isFavorite: true,
      hasTranscription: true,
      audioData: Array.from({ length: 100 }, () => Math.random())
    },
    {
      id: 4,
      title: "Anniversary Surprise",
      date: "2025-01-02",
      duration: 89,
      transcription: "I have something special planned for our anniversary next week. I won't spoil the surprise, but I will say it involves that little café where we had our first date. I love you more each day.",
      mood: "excited",
      isFavorite: true,
      hasTranscription: true,
      audioData: Array.from({ length: 100 }, () => Math.random())
    },
    {
      id: 5,
      title: "Missing You",
      date: "2025-01-01",
      duration: 28,
      transcription: "I miss you so much when we're apart. Even just a few hours feels like forever. You've become such an important part of my life, and I can't imagine it without you.",
      mood: "romantic",
      isFavorite: false,
      hasTranscription: true,
      audioData: Array.from({ length: 100 }, () => Math.random())
    }
  ]);

  // Recording timer effect
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Audio playback time update
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio?.currentTime);
    const updateDuration = () => setDuration(audio?.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      if (!isLooping) {
        setCurrentTime(0);
      }
    };

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', updateDuration);
    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('loadedmetadata', updateDuration);
      audio?.removeEventListener('ended', handleEnded);
    };
  }, [isLooping]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder?.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);

      // Simulate audio level monitoring
      const audioContext = new AudioContext();
      const analyser = audioContext?.createAnalyser();
      const microphone = audioContext?.createMediaStreamSource(stream);
      microphone?.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateAudioLevel = () => {
        if (isRecording && !isPaused) {
          analyser?.getByteFrequencyData(dataArray);
          const average = dataArray?.reduce((a, b) => a + b) / dataArray?.length;
          setAudioLevel(average / 255);
          requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current) {
      mediaRecorderRef?.current?.stop();
      mediaRecorderRef?.current?.stream?.getTracks()?.forEach(track => track?.stop());
    }
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setAudioLevel(0);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef?.current?.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef?.current?.pause();
        setIsPaused(true);
      }
    }
  };

  const handlePlay = () => {
    if (audioRef?.current && currentNote) {
      audioRef?.current?.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef?.current) {
      audioRef?.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef?.current) {
      audioRef?.current?.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSeek = (time) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef?.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleSelectNote = (note) => {
    setCurrentNote(note);
    setDuration(note?.duration);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleDeleteNote = (noteId) => {
    // In a real app, this would delete from the backend
    console.log('Delete note:', noteId);
  };

  const handleRenameNote = (noteId, newTitle) => {
    // In a real app, this would update the backend
    console.log('Rename note:', noteId, newTitle);
  };

  const handleCreatePlaylist = (noteIds, playlistName) => {
    // In a real app, this would create a playlist
    console.log('Create playlist:', playlistName, noteIds);
  };

  const handleEffectChange = (effectId, value) => {
    setAudioEffects(prev => ({
      ...prev,
      [effectId]: value
    }));
  };

  const handleApplyEffects = () => {
    // In a real app, this would apply audio effects
    console.log('Apply effects:', audioEffects);
  };

  const handleResetEffects = () => {
    setAudioEffects({
      noiseReduction: 0,
      volumeBoost: 0,
      clarity: 0,
      reverb: 0,
      echo: 0,
      pitch: 0,
      lowPass: 20000,
      highPass: 20,
      bandPass: 1000
    });
  };

  const handleEditTranscription = (newTranscription) => {
    if (currentNote) {
      // In a real app, this would update the backend
      console.log('Update transcription:', currentNote?.id, newTranscription);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className={`absolute text-primary/10 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            <Icon name="Mic" size={16 + i * 2} />
          </div>
        ))}
      </div>
      <main className="pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                Voice Notes Studio
              </h1>
              <p className="font-body text-muted-foreground">
                Record, organize, and share your intimate voice messages
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/desktop-home')}
                iconName="Home"
                iconPosition="left"
              >
                Home
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowEffectsPanel(!showEffectsPanel)}
                iconName="Sliders"
                iconPosition="left"
              >
                Effects
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Voice Notes List */}
            <div className="lg:col-span-1">
              <VoiceNotesList
                voiceNotes={voiceNotes}
                currentNote={currentNote}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteNote}
                onRenameNote={handleRenameNote}
                onCreatePlaylist={handleCreatePlaylist}
              />
            </div>

            {/* Right Column - Recording & Playback */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recording Controls */}
              <RecordingControls
                isRecording={isRecording}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onPauseRecording={pauseRecording}
                isPaused={isPaused}
                recordingTime={recordingTime}
                audioLevel={audioLevel}
              />

              {/* Waveform Visualizer */}
              <WaveformVisualizer
                audioData={currentNote?.audioData}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
                isRecording={isRecording}
                liveAudioData={isRecording ? Array.from({ length: 50 }, () => audioLevel + Math.random() * 0.3) : null}
              />

              {/* Playback Controls */}
              <PlaybackControls
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onStop={handleStop}
                onSeek={handleSeek}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                playbackSpeed={playbackSpeed}
                onSpeedChange={handleSpeedChange}
                isLooping={isLooping}
                onToggleLoop={() => setIsLooping(!isLooping)}
                currentNote={currentNote}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/love-letters-manager')}
              iconName="Heart"
              iconPosition="left"
              className="h-16"
            >
              <div className="text-center">
                <div className="font-body text-sm font-medium">Love Letters</div>
                <div className="font-caption text-xs text-muted-foreground">Write & organize</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/photo-timeline-gallery')}
              iconName="Camera"
              iconPosition="left"
              className="h-16"
            >
              <div className="text-center">
                <div className="font-body text-sm font-medium">Photo Timeline</div>
                <div className="font-caption text-xs text-muted-foreground">Visual memories</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/shared-calendar-planner')}
              iconName="Calendar"
              iconPosition="left"
              className="h-16"
            >
              <div className="text-center">
                <div className="font-body text-sm font-medium">Calendar</div>
                <div className="font-caption text-xs text-muted-foreground">Plan together</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/secret-box-vault')}
              iconName="Lock"
              iconPosition="left"
              className="h-16"
            >
              <div className="text-center">
                <div className="font-body text-sm font-medium">Secret Box</div>
                <div className="font-caption text-xs text-muted-foreground">Private vault</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop={isLooping}
        volume={volume}
        style={{ display: 'none' }}
      />
      {/* Transcription Overlay */}
      <TranscriptionOverlay
        transcription={currentNote?.transcription}
        currentTime={currentTime}
        duration={duration}
        isVisible={showTranscription}
        onToggleVisibility={() => setShowTranscription(!showTranscription)}
        onEditTranscription={handleEditTranscription}
      />
      {/* Audio Effects Panel */}
      <AudioEffectsPanel
        isVisible={showEffectsPanel}
        onToggleVisibility={() => setShowEffectsPanel(!showEffectsPanel)}
        effects={audioEffects}
        onEffectChange={handleEffectChange}
        onApplyEffects={handleApplyEffects}
        onResetEffects={handleResetEffects}
        isProcessing={false}
      />
    </div>
  );
};

export default VoiceNotesStudio;