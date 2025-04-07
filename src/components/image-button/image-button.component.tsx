import { cx } from "@sk-web-gui/react";

interface ImageButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  imageUrl: string;
}

export const ImageButton: React.FC<ImageButtonProps> = (props) => {
  const { imageUrl, children, className, ...rest } = props;
  return (
    <button
      className={cx(
        "h-56 min-w-56 rounded-button-lg overflow-hidden inline-flex border-1 justify-start border-divider gap-16 hover:bg-background-200",
        className
      )}
      {...rest}
    >
      <span
        className="w-68 h-56 bg-cover bg-center inline-flex"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></span>
      <span className="h-56 pr-18 grow flex items-center justify-start text-label-medium">
        {children}
      </span>
    </button>
  );
};
