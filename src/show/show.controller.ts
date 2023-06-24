import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ShowService } from './show.service';
import { ApiTags } from '@nestjs/swagger';
import { createCanvas } from 'canvas';
import { Response } from 'express';

@ApiTags('Show')
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get(':id')
  async generateImage(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const textObj = await this.showService.getImage(id);
    const canvas = createCanvas(700, 400);
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgb(150, 171, 130)';
    context.fillRect(0, 0, 700, 400);

    context.fillStyle = 'rgba(113, 126, 100, 0.5)';

    context.fillRect(0, 350, 480, 50);

    context.font = '30px Arial';
    context.fillStyle = 'white';
    context.fillText(`Powered by ${textObj.author}`, 15, 385);
    context.textAlign = 'center';
    context.fillText(textObj.title, 350, 150);
    context.font = 'bold 30px Arial Bold';
    context.fillText(textObj.content, 350, 200);

    const buffer = canvas.toBuffer('image/png');

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }
}
