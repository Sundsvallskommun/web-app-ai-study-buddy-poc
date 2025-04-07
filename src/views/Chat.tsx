import { Bubble, InputSection } from "@sk-web-gui/ai";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { AIFeed } from "../components/ai-feed";
import { useAppStore } from "../hooks/appStore";
import { useAssistantStore } from "../services/assistant-store";
import { AskAssistant, ChatHistory } from "../types";
import { useEffect, useRef, useState } from "react";

export const Chat: React.FC<{
  history: ChatHistory;
  sendQuery: (query: string, files?: AskAssistant["files"]) => void;
}> = ({ history, sendQuery }) => {
  const [showBubbles, setShowBubbles] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const { t } = useTranslation();
  const [files] = useAppStore((state) => [state.files]);
  const [info] = useAssistantStore((state) => [state.info], shallow);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleSendQuery = (query: string) => {
    if (query) {
      sendQuery(query, showBubbles ? files : undefined);
      setShowBubbles(false);
      setValue("");
    }
  };

  const questions = [
    t("common:question.1"),
    t("common:question.2"),
    t("common:question.3"),
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, scrollRef]);
  return (
    <>
      <div
        className="overflow-y-auto grow w-full flex flex-col shrink justify-end"
        ref={scrollRef}
      >
        <AIFeed
          history={history}
          avatars={{
            assistant: typeof info?.avatar === "object" ? info.avatar : <></>,
          }}
          className="w-full max-w-[1000px] mx-auto"
        />
      </div>
      {showBubbles && (
        <div className="sk-ai-corner-module-feed-questions-wrapper w-full max-w-[1000px] mx-auto">
          <div className="sk-ai-corner-module-feed-questions-title">
            {t("common:question.title")}
          </div>

          <div className="sk-ai-corner-module-feed-questions flex-row">
            {questions?.map((question, index) => (
              <Bubble
                key={`q-bubble-${index}`}
                onClick={() => handleSendQuery(question)}
              >
                {question}
              </Bubble>
            ))}
          </div>
        </div>
      )}
      <InputSection
        value={value}
        onChangeValue={(event) => setValue(event.target.value)}
        placeholder="Skriv till assistanten"
        onSendQuery={handleSendQuery}
        shadow={false}
        className="shrink-0 w-full max-w-[1000px]"
      />
    </>
  );
};
