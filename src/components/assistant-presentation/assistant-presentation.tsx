import { cx } from "@sk-web-gui/utils";
import React from "react";
import { AIFeedAvatar, AssistantInfo } from "../../types";
import { AssistantAvatar } from "./assistant-avatar";
import Markdown from "react-markdown";
import { MarkdownRendered } from "@sk-web-gui/ai";

export interface AssistantPresentationProps
  extends React.ComponentPropsWithoutRef<"div"> {
  assistant: AssistantInfo;
  size?: "lg" | "sm";
  avatar?: AIFeedAvatar;
}

export const AssistantPresentation = React.forwardRef<
  HTMLDivElement,
  AssistantPresentationProps
>((props, ref) => {
  const { className, assistant, size = "lg", avatar, ...rest } = props;

  const getDefaultDescription = () => {
    switch (typeof assistant?.description) {
      case "string":
        return assistant?.description;
      case "object":
        return assistant?.description?.default || undefined;
      default:
        return undefined;
    }
  };

  const languages =
    typeof assistant?.description === "object"
      ? Object.keys(assistant?.description).filter((key) => key !== "default")
      : undefined;

  const getLanguageDescriptions = (language: string): string | undefined => {
    if (typeof assistant?.description === "object") {
      return assistant?.description?.[language];
    }

    return undefined;
  };

  return (
    <div
      ref={ref}
      className={cx("sk-ai-assistant-presentation", className)}
      data-size={size}
      {...rest}
    >
      <AssistantAvatar size="lg" avatar={avatar} assistant={assistant} />
      <div className="sk-ai-assistant-presentation-header">
        <div className="sk-ai-assistant-presentation-header-title">
          {assistant.name}
        </div>
        <div className="sk-ai-assistant-presentation-header-descriptions">
          {getDefaultDescription() && (
            <div className="sk-ai-assistant-presentation-header-description">
              <MarkdownRendered
                text={getDefaultDescription()}
                messageId=""
                hideElements={false}
              />
            </div>
          )}
          {languages &&
            languages.map((lang, index) => (
              <div
                key={`${lang}-${index}`}
                lang={lang}
                className="sk-ai-assistant-presentation-header-description"
              >
                <MarkdownRendered
                  text={getLanguageDescriptions(lang)}
                  messageId=""
                  hideElements={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});
