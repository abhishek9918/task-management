import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-laoder',
  imports: [CommonModule],
  templateUrl: './laoder.component.html',
  styleUrl: './laoder.component.scss',
})
export class LaoderComponent {
  @Input() isLoading: boolean = false; // Control visibility
}
