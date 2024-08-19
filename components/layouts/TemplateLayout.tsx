import { PropsWithChildren } from "react";
import Container from "../Container";

export interface TemplateLayoutProps {}

export default function TemplateLayout({
  children,
}: PropsWithChildren<TemplateLayoutProps>) {
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
    >
      {children}
    </Container>
  );
}
