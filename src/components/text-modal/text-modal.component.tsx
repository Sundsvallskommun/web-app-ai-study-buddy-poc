import { Button, Modal, Textarea } from "@sk-web-gui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface TextProps {
  onChange: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const TextModal: React.FC<TextProps> = ({
  onChange,
  onSubmit,
  onClose,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState<string>(null);

  return (
    <Modal
      onClose={onClose}
      show={true}
      label={t("common:upload.text")}
      labelAs={"h2"}
      className={"w-full max-w-[620px]"}
    >
      <div className="flex flex-col h-full w-full gap-32">
        <h2 className="">{t("common:enter_text")}:</h2>
        <Textarea
          className="w-full"
          size="lg"
          onChange={(e) => {
            setText(e.currentTarget.value);
            onChange?.(e.currentTarget.value);
          }}
          rows={4}
          placeholder={'Fisk - Fish,\nDjur - Animal\netc...'}
        />

        <div className="flex gap-16">
          <Button color="vattjom" disabled={!text} onClick={onSubmit}>
            {t("common:submit")}
          </Button>

          <Button variant="secondary" onClick={onClose}>
            {t("common:cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
