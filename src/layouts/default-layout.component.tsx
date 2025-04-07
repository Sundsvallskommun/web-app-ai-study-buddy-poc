import { Button, cx, Icon } from "@sk-web-gui/react";
import { MessagesSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DefaultLayoutProps extends React.ComponentPropsWithoutRef<"div"> {
  label?: string;
  onNewSession?: () => void;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { label, className, onNewSession, ...rest } = props;
  const { t } = useTranslation();
  return (
    <div className="w-dvw h-dvh portrait:max-h-dvh bg-background-content text-dark-primary flex flex-col overflow-hidden">
      <header className="w-full shrink-0 flex justify-between items-center bg-juniskar-surface-primary text-juniskar-text-secondary py-8 px-20">
        <h1 className="inline-flex items-center justify-center gap-8 px-18 py-8 text-label-medium m-0">
          {label}
        </h1>

        <div>
          {!!onNewSession && (
            <Button onClick={onNewSession} size="sm" variant="primary" inverted>
              {t("common:new_session")}
            </Button>
          )}
        </div>
      </header>
      <div
        className={cx(
          "grow shrink overflow-hidden flex w-full justify-center",
          className
        )}
        {...rest}
      />
    </div>
  );
};
