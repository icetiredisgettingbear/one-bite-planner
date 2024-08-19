import { PropsWithChildren } from "react";
import Container, { ContainerProps } from "../Container";

export interface TemplateLayoutProps extends ContainerProps {}

export default function TemplateLayout({ ...props }: TemplateLayoutProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 15,
        pb: 10,
        gap: 4,
      }}
      {...props}
    />
  );
}
