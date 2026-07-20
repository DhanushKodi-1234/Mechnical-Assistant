import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'custom-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {
  // Table details
  @Input() columns: { key: string; label: string; sortable: boolean }[] = [];
  @Input() data: any[] = [];
  @Input() actions: any[] = [];
  @Input() showaction: boolean = true;
  @Input() showfilter: boolean = true;
  @Input() pageSizeOptions = [5, 10, 20, 50];
  @Input() totalRecords: number = 0;
  @Input() loading: boolean = false;

  @Output() requestData = new EventEmitter<{
    page: number;
    pageSize: number;
    search?: string;
    sortKey?: string;
    sortDirection?: 'asc' | 'desc';
  }>();

  paginationItems: Array<{ page: number | '...', isActive?: boolean }> = [];
  @Output() filterClicked = new EventEmitter<void>();

  // pagination options
  currentPage = 1;
  pageSize = 5;
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText = '';
  filteredData: any[] = [];

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize) || 1;
  }

  constructor() {}

  ngOnInit(): void {
    this.pageSize = this.pageSizeOptions[0];
    this.emitRequest();
    this.updatePagination(); 
  }

  onOpenFilters() {
  this.filterClicked.emit();
}

  clearSearch(): void {
    this.searchText = '';
    this.onSearch();
  }

  getCellValue(row: any, key: string): any {
    if (!row || !key) return '';

    // Dot notation (e.g., 'locationIds.locationName')
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      const parentValue = row[parentKey];
      // If array
      if (Array.isArray(parentValue)) {
        const arr = parentValue.map((obj: any) => obj?.[childKey]).filter(Boolean);
        return arr.length ? arr.join(', ') : '--';
      }
      // If object
      if (typeof parentValue === 'object' && parentValue !== null) {
        return parentValue[childKey] ?? '--';
      }
      // Fallback
      return '--';
    }

    // No dot: normal field
    let value = row[key];
    if (Array.isArray(value)) {
      if (value.length === 0) return '--';
      if (typeof value[0] === 'string' || typeof value[0] === 'number' || typeof value[0] === 'boolean') {
        return value.join(', ');
      }
      return value.length;
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value ?? '--';
  }

  ngOnChanges(changes: SimpleChanges): void {
  if (changes['totalRecords'] || changes['pageSize'] || changes['currentPage']) {
    this.updatePagination();
  }
}


  onSearch() {
    this.currentPage = 1;
    this.emitRequest();
    this.updatePagination();
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.emitRequest();
  this.updatePagination();
  }

  onPageSizeChange(size: number) {
    this.pageSize = +size;
    this.currentPage = 1;
    this.emitRequest();
    this.updatePagination();
  }

  onSort(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.emitRequest();
  this.updatePagination();
  }

  emitRequest() {
    this.requestData.emit({
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchText,
      sortKey: this.sortKey,
      sortDirection: this.sortDirection
    });
  }

  private updatePagination(): void {
  const total = this.totalPages || 1;
  const current = this.currentPage || 1;
  const pages: Array<number | '...'> = [];

  const push = (p: number | '...') => pages.push(p);

  if (total <= 7) {
    for (let p = 1; p <= total; p++) push(p);
  } else {
    const showLeft = Math.max(2, current - 1);
    const showRight = Math.min(total - 1, current + 1);

    push(1);
    if (showLeft > 2) push('...');
    for (let p = showLeft; p <= showRight; p++) push(p);
    if (showRight < total - 1) push('...');
    push(total);
  }

  this.paginationItems = pages.map(p => ({
    page: p,
    isActive: p === current
  })) as any;
}

}
