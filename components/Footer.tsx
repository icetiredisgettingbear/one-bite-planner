import Container from "./Container";
import Typography from "./Typography";

export default function Footer() {
  return (
    <Container component="footer" maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="body2" color="disabled">
        ⓒ 한입 플래너. All rights reserved.
      </Typography>
    </Container>
  );
}
