import Typography from "./Typography";

export default function Footer() {
  return (
    <footer className="w-full max-w-[1280px] px-10 py-8 flex text-center">
      <Typography variant="body2" className="text-disabled">
        ⓒ 한입 플래너. All rights reserved.
      </Typography>
    </footer>
  );
}
