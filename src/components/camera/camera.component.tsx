import React, { useState, useRef, useEffect } from "react";
import Measure from "react-measure";
import { useUserMedia } from "../../utils/use-user-media";
import { useCardRatio } from "../../utils/use-card-ratio";
import { useOffsets } from "../../utils/use-offsets";
import { Button, cx, Modal } from "@sk-web-gui/react";
import { useTranslation } from "react-i18next";

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: "environment",
  },
};

interface CameraProps {
  onCapture: (blob: Blob) => void;
  onClear: () => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const Camera: React.FC<CameraProps> = ({
  onCapture,
  onClear,
  onSubmit,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [ready, setReady] = useState(false);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  const { t } = useTranslation();

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleResize(contentRect) {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio),
    });
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current.play();
  }

  function handleCapture() {
    const context = canvasRef.current.getContext("2d");

    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      0,
      0,
      container.width,
      container.height
    );

    canvasRef.current.toBlob((blob) => onCapture(blob), "image/jpeg", 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 1000);
  }

  useEffect(() => {
    if (container && canvasRef.current && videoRef.current) {
      setReady(true);
    }
  }, [container, canvasRef, videoRef]);

  function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    onClear();
  }

  if (!mediaStream) {
    return null;
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Modal
          onClose={onClose}
          show={true}
          label={t("common:upload.camera")}
          labelAs={"h2"}
          className={cx(
            "max-w-[calc(100vw-64px)] max-h-[calc(100vh-64px)]",
            "w-[85vw] h-[85vh]"
          )}
        >
          <div className="flex flex-col items-center justify-center h-full w-full gap-32">
            <div
              className="relative w-full overflow-hidden"
              ref={measureRef}
              style={{
                height: `${container.height}px`,
                maxHeight: videoRef.current
                  ? videoRef.current.videoHeight
                  : undefined,
                maxWidth: videoRef.current
                  ? videoRef.current.videoWidth
                  : undefined,
              }}
            >
              <video
                className="absolute"
                ref={videoRef}
                hidden={!isVideoPlaying}
                onCanPlay={handleCanPlay}
                autoPlay
                playsInline
                muted
                style={{
                  top: `-${offsets.y}px`,
                  left: `-${offsets.x}px`,
                }}
              />

              <div
                className="absolute top-20 right-20 bottom-20 left-20 border-1 border-divider rounded-cards"
                hidden={!isVideoPlaying}
              />

              <canvas
                className="absolute top-0 left-0 bottom-0 right-0"
                ref={canvasRef}
                width={container.width}
                height={container.height}
              />

              <div
                className={cx(
                  "absolute top-0 left-0 bottom-0 right-0",
                  isFlashing ? "animate-blink" : ""
                )}
              />
            </div>

            {isVideoPlaying && (
              <Button
                onClick={isCanvasEmpty ? handleCapture : handleClear}
                disabled={!ready}
              >
                {isCanvasEmpty
                  ? t("common:take_a_picture")
                  : t("common:reset_image")}
              </Button>
            )}
            <Button color="vattjom" disabled={isCanvasEmpty} onClick={onSubmit}>
              {t("common:select_image")}
            </Button>
          </div>
        </Modal>
      )}
    </Measure>
  );
};
