import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonVariant;
}

//define a cor primary como default
export function Button({ variant = "primary" }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}
