import { Button, cx, Modal } from "@sk-web-gui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";

interface CameraProps {
  onCapture: (blob: Blob) => void;
  onClear: () => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const CameraModal: React.FC<CameraProps> = ({
  onCapture,
  onClear,
  onSubmit,
  onClose,
}) => {
  const camera = useRef<any>(null);
  const [image, setImage] = useState<any | null>(null);
  const { t } = useTranslation();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  useEffect(() => {
    if (image) {
      onCapture(image);
    } else {
      onClear();
    }
  }, [image]);

  return (
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
        <div className="relative">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            ref={camera}
          />
          {image ? (
            <div className="absolute top-0 left-0">
              <img src={image} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-16">
          <Button
            onClick={() =>
              !image ? setImage(camera.current.getScreenshot()) : setImage(null)
            }
          >
            {!image ? t("common:take_a_picture") : t("common:reset_image")}
          </Button>

          <Button color="vattjom" disabled={!image} onClick={onSubmit}>
            {t("common:select_image")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
