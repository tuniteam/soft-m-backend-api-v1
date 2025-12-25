// ============================================
// SOFT-M - ParseCuidPipe
// Validates CUID format for route parameters
// ============================================

import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { isCuid } from '@paralleldrive/cuid2';

@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isCuid(value)) {
      throw new BadRequestException(
        `Validation failed (CUID expected): ${value}`,
      );
    }
    return value;
  }
}
