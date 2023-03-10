import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
}
