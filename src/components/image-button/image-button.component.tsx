import { cx } from "@sk-web-gui/react";

interface ImageButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  imageUrl: string;
}

export const ImageButton: React.FC<ImageButtonProps> = (props) => {
  const { imageUrl, children, className, ...rest } = props;
  return (
    <button
      className={cx(
        "h-40 min-w-40 md:h-56 md:min-w-56 rounded-button-lg overflow-hidden inline-flex border-1 justify-start border-divider gap-16 hover:bg-background-200",
        className
      )}
      {...rest}
    >
      <span
        className="h-40 w-50 md:w-68 md:h-56 bg-cover bg-center inline-flex"
        style={{ backgroundImage: `url(${import.meta.env.VITE_BASE_PATH}${imageUrl})` }}
      ></span>
      <span className="h-40 md:h-56 pr-10 md:pr-18 grow flex items-center justify-start text-label-small md:text-label-medium">
        {children}
      </span>
    </button>
  );
};
