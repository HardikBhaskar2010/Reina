import React from 'react';
import { cn } from '../../utils/cn';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/30',
        className
      )}
      {...props}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-soft border border-border/20" data-testid="card-skeleton">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};

export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3" data-testid="list-skeleton">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 glass-card rounded-xl">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const GridSkeleton = ({ count = 6, columns = 3 }) => {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}
      data-testid="grid-skeleton"
    >
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center" data-testid="loading-spinner">
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-primary/30 border-t-primary',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};

export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background"
      data-testid="page-loader"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <LoadingSpinner size="md" className="border-white/30 border-t-white" />
        </div>
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">
          {message}
        </h2>
        <p className="font-body text-muted-foreground">Please wait...</p>
      </div>
    </div>
  );
};

export default Skeleton;