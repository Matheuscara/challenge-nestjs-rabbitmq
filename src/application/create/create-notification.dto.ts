import { IsUUID, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty({ description: "ID da mensagem (UUID)" })
  @IsUUID()
  mensagemId: string;

  @ApiProperty({ description: "Conteúdo da mensagem" })
  @IsString()
  @IsNotEmpty()
  conteudoMensagem: string;
}
