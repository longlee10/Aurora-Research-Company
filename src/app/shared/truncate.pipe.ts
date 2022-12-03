/*******************************
File Name: truncate.pipe.ts
Description: Pipe to truncate the string
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(text: string, count: number, endIfExceeded: string): string {
    return text.length < count ? text : text.slice(0, count) + endIfExceeded;
  }

}
