import { FileUpload, useSnackbar } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AIFeed } from "../components/ai-feed";
import { ImageButton } from "../components/image-button/image-button.component";
import { WizardArea } from "../components/wizard-area/wizard-area.component";
import { useAppStore } from "../hooks/appStore";
import { uploadFile } from "../services/assistant-service";
import { ChatEntryReference, ChatHistory, FilePublic, Origin } from "../types";
import { WizardPageProps } from "../types/wizard-page-props.interface";
import { CameraModal } from "../components/camera-modal/camera-modal.component";
import { TextModal } from "../components/text-modal/text-modal.component";

export const UploadFile: React.FC<
  WizardPageProps & {
    history?: ChatHistory;
    addOrUpdateHistoryEntry?: (
      origin: Origin,
      text: string,
      id: string,
      done: boolean,
      references?: ChatEntryReference[],
      files?: FilePublic[]
    ) => void;
  }
> = ({ onNext, history, addOrUpdateHistoryEntry }) => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [fullfiles, setFullfiles] = useState<FilePublic[]>([]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const [cardImage, setCardImage] = useState<Blob>(null);
  const [cardText, setCardText] = useState<string>(null);
  const [selectedLanguage, addFile, files] = useAppStore((state) => [
    state.selectedLanguage,
    state.addFile,
    state.files,
  ]);
  const { t } = useTranslation();

  const message = useSnackbar();

  useEffect(() => {
    if (selectedLanguage && addOrUpdateHistoryEntry && history?.length < 1) {
      const startPhrase = t(`common:selected_language.${selectedLanguage}`);
      addOrUpdateHistoryEntry(
        "assistant",
        `**${startPhrase}**\r\r${t("common:pick_language")}`,
        "0",
        true
      );
    }
  }, [selectedLanguage, addOrUpdateHistoryEntry, history]);

  const handleFiles = (event: any) => {
    setError(false);
    setFileCount(event.target.value.length);
    for (let index = 0; index < event.target.value.length; index++) {
      const file = event.target.value?.[index]?.file;
      uploadFile(file)
        .then((res) => {
          addFile({ id: res.id });
          setFullfiles((files) => [...files, res]);
        })
        .catch(() => {
          message({ message: t("common:could_not_upload"), status: "error" });
          setError(true);
          setFileCount((count) => count - 1);
        });
    }
  };

  const handlePhoto = () => {
    if (cardImage) {
      const base64Data = cardImage.toString();
      const byteString = atob(base64Data.split(",")[1]);

      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const file = new File([blob], "image.jpeg", { type: "image/jpeg" });

      setFileCount(1);
      uploadFile(file).then((res) => {
        addFile({ id: res.id });
        setFullfiles((files) => [...files, res]);
      });
    }
  };

  const handleText = () => {
    if (cardText) {
      const file = new File(["\ufeff" + cardText], "text", {
        type: "text/plain:charset=UTF-8",
      });

      setFileCount(1);
      uploadFile(file).then((res) => {
        addFile({ id: res.id });
        setFullfiles((files) => [...files, res]);
      });
    }
  };

  useEffect(() => {
    if (fullfiles.length > 0 && !error) {
      if (fileCount === files.length) {
        if (!cardText) {
          addOrUpdateHistoryEntry(
            "user",
            `${t("common:my_files")}:`,
            "1",
            true,
            [],
            fullfiles
          );
        }
        setDone(true);
      } else {
        addOrUpdateHistoryEntry("user", "", "1", false);
      }
    }
  }, [fullfiles, files]);

  useEffect(() => {
    if (done) {
      if (!error && fullfiles.length > 0) {
        addOrUpdateHistoryEntry(
          "assistant",
          t("common:start_chatting"),
          "2",
          true
        );
        setTimeout(() => {
          onNext();
        }, 500);
      } else {
        setFullfiles([]);
        setError(false);
        setDone(false);
        setCardImage(null);
        setCardText(null);
      }
    }
  }, [done]);

  return (
    <>
      <div className="overflow-y-auto grow w-full flex flex-col shrink justify-end px-16">
        <AIFeed history={history} className="w-full max-w-[1000px] mx-auto" />
      </div>
      {cameraOpen && (
        <CameraModal
          onCapture={(blob) => setCardImage(blob)}
          onClear={() => setCardImage(null)}
          onSubmit={handlePhoto}
          onClose={() => {
            setCardImage(null);
            setCameraOpen(false);
          }}
        />
      )}

      {textOpen && (
        <TextModal
          onChange={(text) => setCardText(text)}
          onSubmit={handleText}
          onClose={() => {
            setCardText(null);
            setTextOpen(false);
          }}
        />
      )}

      <FileUpload.Area
        dragDropEnabled
        relativity="component"
        onChange={handleFiles}
        allowMultiple
      >
        <WizardArea className="md:grid-cols-[1fr_1fr_1fr] max-w-[900px]">
          <ImageButton
            imageUrl="images/camera.png"
            className="min-w-[200px] grow"
            onClick={() => setCameraOpen(true)}
          >
            {t("common:upload.camera")}
          </ImageButton>
          <FileUpload.Button onChange={handleFiles}>
            <ImageButton
              imageUrl="images/browse.png"
              className="min-w-[200px] grow"
            >
              {t("common:upload.browse")}
            </ImageButton>
          </FileUpload.Button>
          <ImageButton
            imageUrl="images/text.png"
            className="min-w-[200px] grow"
            onClick={() => setTextOpen(true)}
          >
            {t("common:upload.text")}
          </ImageButton>
        </WizardArea>
      </FileUpload.Area>
    </>
  );
};
