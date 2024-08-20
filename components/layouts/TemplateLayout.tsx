import Container, { ContainerProps } from "../Container";

export interface TemplateLayoutProps extends ContainerProps {}

export default function TemplateLayout({ ...props }: TemplateLayoutProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: { xs: 10, sm: 15 },
        pb: { xs: 6, sm: 10 },
        gap: { xs: 3, sm: 5 },
      }}
      {...props}
    />
  );
}
