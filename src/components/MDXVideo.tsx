interface LoopVideoProps {
  src: string;
  width?: string;
  height?: string;
}

export const LoopVideo = ({
  src,
  width,
  height,
}: LoopVideoProps): JSX.Element => {
  return (
    <video width={width} height={height} autoPlay loop muted playsInline>
      <source src={src} type="video/mp4" />
    </video>
  );
};
