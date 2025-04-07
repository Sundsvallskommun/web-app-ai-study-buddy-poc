import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../hooks/appStore";
import { DefaultLayout } from "../layouts/default-layout.component";
import { Start } from "./Start";
import { UploadFile } from "./UploadFile";
import { useChat } from "../services/useChat";
import { shallow } from "zustand/shallow";
import { useAssistantStore } from "../services/assistant-store";
import { Chat } from "./Chat";

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(0);

  const [sessionId, setSessionId, setSelectedLanguage, resetFiles] =
    useAppStore(
      (state) => [
        state.sessionId,
        state.setSessionId,
        state.setSelectedLanguage,
        state.resetFiles,
      ],
      shallow
    );

  const [settings, setSettings] = useAssistantStore(
    (state) => [state.settings, state.setSettings],
    shallow
  );

  const { sendQuery, history, newSession, session, addOrUpdateHistoryEntry } =
    useChat({
      sessionId,
      settings,
    });

  const pages: React.JSX.Element[] = [
    <Start onNext={() => setPage(1)} />,
    <UploadFile
      onNext={() => setPage(2)}
      history={history}
      addOrUpdateHistoryEntry={addOrUpdateHistoryEntry}
    />,
    <Chat history={history} sendQuery={sendQuery} />,
  ];

  useEffect(() => {
    if (page === 0) {
      newSession();
      setSelectedLanguage("");
      setSettings({ assistantId: "" });
      resetFiles();
    }
  }, [page]);

  useEffect(() => {
    newSession();
  }, [settings?.assistantId]);

  const { t } = useTranslation();

  useEffect(() => {
    if (session?.id && session.id !== sessionId) {
      setSessionId(session.id);
    }
  }, [session?.id]);

  return (
    <DefaultLayout
      label={t("common:app_name")}
      onNewSession={page === 0 ? undefined : () => setPage(0)}
    >
      <main className="flex w-full overflow-hidden flex-col grow shrink h-full max-h-full justify-end items-center gap-16 md:gap-32">
        {pages[page]}
      </main>
    </DefaultLayout>
  );
};
