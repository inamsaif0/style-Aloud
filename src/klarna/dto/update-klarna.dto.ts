import { PartialType } from '@nestjs/mapped-types';
import { CreateKlarnaDto } from './create-klarna.dto';

export class UpdateKlarnaDto extends PartialType(CreateKlarnaDto) {}
