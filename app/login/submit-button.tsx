"use client";

import { useFormStatus } from "react-dom";
import Button, { ButtonProps } from "@/components/Button";

interface SubmitButtonProps extends ButtonProps {
  pendingText?: string;
}

export function SubmitButton({
  children,
  pendingText,
  ...props
}: SubmitButtonProps) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" aria-disabled={pending} fullWidth>
      {isPending ? pendingText : children}
    </Button>
  );
}
