import { useScrollProgress } from '../../hooks/useScrollProgress';

export function StoryProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="story-progress"
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-label="Story progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
