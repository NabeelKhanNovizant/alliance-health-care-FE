import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';


interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Diabetes',
    children: [
      {
        name: 'Sub Problem: Type 1 Diabetes',
        children: [
          {
            name: 'Goal: Reduce risk of heart attack',
            children: [
              { name: 'Milestone: Regular exercise' },
              { name: 'Barrier: Lack of motivation to exercise' }
            ]
          }
        ]
      },
      {
        name: 'Sub Problem: Type 2 Diabetes',
        children: [
          {
            name: 'Goal: Maintain healthy blood pressure',
            children: [
              { name: 'Milestone: Daily blood pressure readings' },
              { name: 'Barrier: Irregular check-ups' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Cardiovascular Diseases',
    children: [
      {
        name: 'Sub Problem: Heart Conditions',
        children: [
          {
            name: 'Goal: Reduce risk of heart attack',
            children: [
              { name: 'Milestone: Regular exercise' },
              { name: 'Barrier: Lack of motivation to exercise' }
            ]
          }
        ]
      },
      {
        name: 'Sub Problem: Hypertension',
        children: [
          {
            name: 'Goal: Maintain healthy blood pressure',
            children: [
              { name: 'Milestone: Daily blood pressure readings' },
              { name: 'Barrier: Irregular check-ups' }
            ]
          }
        ]
      }
    ]
  }
];


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrl: './plan-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanViewComponent implements OnInit {
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
    this.expandAllnodes();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  expandAllnodes(){
    this.treeControl.expandAll();
  }
}
