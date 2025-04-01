import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-pagination',
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems!: number; // Total number of items
  @Input() itemsPerPage: number = 5; // Default items per page
  @Input() currentPage: number = 1; // Default current page
  @Output() pageChanged = new EventEmitter<number>(); // Emit page change

  changePage(event: number) {
    this.pageChanged.emit(event); // Send new page number to parent
  }
}
