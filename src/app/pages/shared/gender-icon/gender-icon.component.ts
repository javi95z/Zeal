import { Component, Input } from '@angular/core';

@Component({
  selector: 'z-gender-icon',
  templateUrl: './gender-icon.component.html',
  styleUrls: ['./gender-icon.component.scss']
})
export class GenderIconComponent {

  @Input() gender: string;

  constructor() { }

}
