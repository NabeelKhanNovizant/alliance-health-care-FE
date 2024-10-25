import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Type 1 Diabetes'},
  {position: 2, name: 'Chronic Hypertension'},
  {position: 3, name: 'Allergic Asthma'},
  {position: 4, name: 'Rheumatoid Arthritis'},
  {position: 5, name: 'Lung Cancer'},
  {position: 6, name: 'Chronic Migraine'},
  {position: 7, name: 'Major Depressive Disorder'},
  {position: 8, name: 'Coronary Artery Disease'},
  {position: 9, name: 'Ischemic Stroke'},
  {position: 10, name: 'Chronic Kidney Disease'}
];
@Component({
  selector: 'app-select-sub-problems',
  templateUrl: './select-sub-problems.component.html',
  styleUrl: './select-sub-problems.component.scss'
})
export class SelectSubProblemsComponent {
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
