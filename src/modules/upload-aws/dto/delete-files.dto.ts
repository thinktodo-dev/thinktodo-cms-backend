import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
export class DeleteFilesDto {
  @IsArray()
  @ApiProperty({
    type: [],
    example: [
      "https://dev-bluebolt-vn.s3.ap-southeast-1.amazonaws.com/public/order/thumbnail_1_3276ff1a8e",
    ],
    required: false,
    description: "Array of file",
  })
  file_url_array: [];
}
