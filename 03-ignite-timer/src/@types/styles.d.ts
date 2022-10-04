//este arquivo serve somente para salvar definições de tipo typescript
import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type themeType = typeof defaultTheme;

//criando um tipagem para o módulo styped components, apenas adicionando ao que já tem.
declare module "styled-components" {
  export interface defaultTheme extends themeType {}
}
