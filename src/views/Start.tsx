import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { ImageButton } from "../components/image-button/image-button.component";
import { WizardArea } from "../components/wizard-area/wizard-area.component";
import { useAppStore } from "../hooks/appStore";
import { useAssistantStore } from "../services/assistant-store";
import { WizardPageProps } from "../types/wizard-page-props.interface";
import { AssistantPresentation } from "../components/assistant-presentation/assistant-presentation";
import { useThemeQueries } from "@sk-web-gui/react";

export const Start: React.FC<WizardPageProps> = ({ onNext }) => {
  const [setSelectedLanguage, assistants] = useAppStore(
    (state) => [state.setSelectedLanguage, state.assistants],
    shallow
  );

  const { isMaxSmallDevice } = useThemeQueries();

  const [setSettings, assistant] = useAssistantStore(
    (state) => [state.setSettings, state.info],
    shallow
  );

  const { t } = useTranslation();

  const handleSelectLanguage = (language: string) => {
    switch (language) {
      case "en":
        setSettings(assistants.en);
        break;
      case "fr":
        setSettings(assistants.fr);
        break;
      case "es":
        setSettings(assistants.es);
        break;
      case "de":
        setSettings(assistants.de);
        break;
    }

    setSelectedLanguage(language);
    onNext?.();
  };

  return (
    <>
      <AssistantPresentation
        assistant={assistant}
        size={isMaxSmallDevice ? "sm" : "lg"}
      />
      <WizardArea className="sm:grid-cols-2 max-w-[600px]">
        <ImageButton
          onClick={() => handleSelectLanguage("en")}
          imageUrl="images/en.png"
          className="min-w-[200px] grow"
        >
          {t("common:languages.en")}
        </ImageButton>
        <ImageButton
          onClick={() => handleSelectLanguage("fr")}
          imageUrl="images/fr.png"
          className="min-w-[200px] grow"
        >
          {t("common:languages.fr")}
        </ImageButton>
        <ImageButton
          onClick={() => handleSelectLanguage("es")}
          imageUrl="images/es.png"
          className="min-w-[200px] grow"
        >
          {t("common:languages.es")}
        </ImageButton>
        <ImageButton
          onClick={() => handleSelectLanguage("de")}
          imageUrl="images/de.png"
          className="min-w-[200px] grow"
        >
          {t("common:languages.de")}
        </ImageButton>
      </WizardArea>
    </>
  );
};
