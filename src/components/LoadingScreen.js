const LoadingScreen = ({ text }) => {
  return (
    <div className="h-screen w-screen fixed flex items-center justify-center flex-col">
      <h1 className="text-white text-xl">{text}</h1>
      <img
        alt="loading-img"
        src="https://cutewallpaper.org/21/loading-gif-transparent-background/2-Methods-to-Recover-an-Unsaved-PowerPoint-File.gif"
      ></img>
    </div>
  );
};

export default LoadingScreen;
