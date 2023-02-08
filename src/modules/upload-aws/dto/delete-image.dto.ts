import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class DeleteImageDto {
  @IsNotEmpty()
  @ApiProperty({
    example:
      "https://dev-bluebolt-vn.s3.ap-southeast-1.amazonaws.com/public/order/thumbnail_1_3276ff1a8e",
    required: true,
    description: "Url of  image",
  })
  image_url: "string";
}
