import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { trigger, state, style, transition, animate } from '@angular/animations';




@Component({
  selector: 'app-case-selection',
  templateUrl: './case-selection.component.html',
  styleUrls: ['./case-selection.component.scss'],
  animations: [
    trigger('expandAnimation', [
      state('void', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
      })),
      state('*', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden',
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class CaseSelectionComponent implements OnInit {

  // Updated data with disease names and sub-problems
  data = [
    {
      id: 1,
      name: 'Diabetes',
      isExpand: false,
      selected: false, 
      isEditable: false, // Checkbox for selecting the disease
      subProblems: [
        { name: 'Type 1 Diabetes', selectedChild: false,isEditable: false },
        { name: 'Type 2 Diabetes', selectedChild: false,isEditable: false },
        { name: 'Gestational Diabetes', selectedChild: false,isEditable: false }
      ]
    },
    {
      id: 2,
      name: 'Hypertension',
      isExpand: false,
      selected: false,
      isEditable: false,
      subProblems: [
        { name: 'Primary Hypertension', selectedChild: false,isEditable: false },
        { name: 'Secondary Hypertension', selectedChild: false,isEditable: false }
      ]
    },
    {
      id: 3,
      name: 'Asthma',
      isExpand: false,
      selected: false,
      isEditable: false,
      subProblems: [
        { name: 'Allergic Asthma', selectedChild: false,isEditable: false },
        { name: 'Non-allergic Asthma', selectedChild: false, isEditable: false }
      ]
    },
    {
      id: 4,
      name: 'Heart Disease',
      isExpand: false,
      selected: false,
      isEditable: false,
      subProblems: [
        { name: 'Coronary Artery Disease', selectedChild: false, isEditable: false },
        { name: 'Heart Failure', selectedChild: false, isEditable: false }
      ]
    },
    {
      id: 5,
      name: 'Obesity',
      isExpand: false,
      selected: false,
      isEditable: false,
      subProblems: [
        { name: 'Overweight', selectedChild: false,isEditable: false },
        { name: 'Morbid Obesity', selectedChild: false,isEditable: false }
      ]
    }
  ];

  ngOnInit(): void {

  }

  addRow(): void {
    const newRow = {
      id: this.data.length + 1,  
      name: '',  
      isExpand: false,
      selected: false,
      isEditable: true,  
      subProblems: []  
    };
    this.data.push(newRow); 
  }
  addSubProblem(row: any): void {
    const newSubProblem = {
      name: '',  
      selectedChild: false,
      isEditable: true  
    };
    row.subProblems.push(newSubProblem);  
  }

  selectAll(event: any): void {
    const checked = event.target.checked;
    this.data.forEach(row => row.selected = checked);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.data = this.data.map(row => {
      row.isExpand = false;
      return row;
    }).filter(row => 
      row.name.toLowerCase().includes(filterValue) || 
      row.subProblems.some(problem => 
        problem.name.toLowerCase().includes(filterValue))
    );
  }
}
