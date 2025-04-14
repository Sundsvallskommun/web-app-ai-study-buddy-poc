import { cx } from "@sk-web-gui/react";

interface WizardAreaProps extends React.ComponentPropsWithRef<"div"> {}

export const WizardArea: React.FC<WizardAreaProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cx(
        "grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-32 mb-24 md:mb-64 justify-center px-32 max-w-[600px]",
        className
      )}
      {...rest}
    ></div>
  );
};
