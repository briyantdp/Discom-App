import LoadingBar from 'react-redux-loading-bar';

export default function LoadingBarComponent() {
  return (
    <LoadingBar
      updateTime={100}
      maxProgress={98}
      className="absolute h-1 bg-orange-500 z-50"
    />
  );
}
