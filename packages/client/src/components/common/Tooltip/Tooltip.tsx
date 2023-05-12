export interface TooltipProps {
  children: React.ReactNode;
}

export const Tooltip = ({ children }: TooltipProps) => {
  return <div>{children}</div>;
};
