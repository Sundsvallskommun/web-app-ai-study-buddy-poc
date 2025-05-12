import {
  Avatar,
  ColorSchemeMode,
  GuiProvider,
  Spinner,
} from "@sk-web-gui/react";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import {
  setAssistantStoreName,
  useAssistantStore,
} from "./services/assistant-store";
import { Main } from "./views/Main";
import { useAppStore } from "./hooks/appStore";
import { AssistantSettings } from "./types";

function App() {
  const [loaded, setLoaded] = useState(false);

  const [setApiBaseUrl, setStream, setApikey, setInfo, info] =
    useAssistantStore((state) => [
      state.setApiBaseUrl,
      state.setStream,
      state.setApikey,
      state.setInfo,
      state.info,
    ]);

  const setAssistants = useAppStore((state) => state.setAssistants);

  const { t } = useTranslation();

  useEffect(() => {
    setApiBaseUrl(import.meta.env.VITE_INTRIC_API_BASE_URL);
    setStream(import.meta.env.VITE_STREAM_DEFAULT);
    if (import.meta.env.VITE_INTRIC_API_KEY) {
      setApikey(import.meta.env.VITE_INTRIC_API_KEY);
    }
    const assistants: Record<string, AssistantSettings> = {
      en: {
        assistantId: import.meta.env.VITE_ASSISTANT_EN,
        hash: import.meta.env.VITE_HASH_EN,
        app: import.meta.env.VITE_APPLICATION_EN,
      },
      de: {
        assistantId: import.meta.env.VITE_ASSISTANT_DE,
        hash: import.meta.env.VITE_HASH_DE,
        app: import.meta.env.VITE_APPLICATION_DE,
      },
      es: {
        assistantId: import.meta.env.VITE_ASSISTANT_ES,
        hash: import.meta.env.VITE_HASH_ES,
        app: import.meta.env.VITE_APPLICATION_ES,
      },
      fr: {
        assistantId: import.meta.env.VITE_ASSISTANT_FR,
        hash: import.meta.env.VITE_HASH_FR,
        app: import.meta.env.VITE_APPLICATION_FR,
      },
    };
    setAssistants(assistants);
    setAssistantStoreName(`sk-assistant-${import.meta.env.VITE_APPLICATION}`);
    setInfo({
      name: t("common:assistant_name"),
      description: t("common:assistant_description"),
      avatar: <Avatar imageUrl={`${import.meta.env.VITE_BASE_PATH}/images/plugghasten.png`} />,
    });
    setLoaded(true);
  }, [setStream, setApiBaseUrl]);

  return (
    <GuiProvider colorScheme={ColorSchemeMode.Light}>
      <Suspense fallback="loading">
        {loaded && info?.description ? <Main /> : <Spinner color="juniskar" />}
      </Suspense>
    </GuiProvider>
  );
}

export default App;
