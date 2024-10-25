import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { CasePopupComponent } from '../../case-popup/case-popup.component';


interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  checked?: boolean;
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrl: './care-plan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CarePlanComponent {
  readonly panelOpenState = signal(false);

  private transformer = (node: TreeNode, level: number): FlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      checked: false, // Initialize the checked state
    };
  };

  // Create tree control and flattener
  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  // Create the data source for the tree using treeControl and treeFlattener
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  treeData: TreeNode[] = [
    {
      name: 'Goal 1',
      children: [
        { name: 'Milestone/Barriers' },
        { name: 'Milestone/Barriers' },
        { name: 'Milestone/Barriers' },
      ],
    },
    {
      name: 'Goal 2',
      children: [
        { name: 'Milestone/Barriers' },
        { name: 'Milestone/Barriers' },
        { name: 'Milestone/Barriers' },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {
    this.dataSource.data = this.treeData;
  }

  opeCaseDialog(): void {
    const dialogRef = this.dialog.open(CasePopupComponent, {
      width: '600px',
      data: {}, // Optional: Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed, selected country:', result);
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  onCheckboxChange(node: FlatNode) {
    node.checked = !node.checked;
    console.log(`${node.name} is checked: ${node.checked}`);
  }
}
