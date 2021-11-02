import {AfterViewInit, Component, OnChanges, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserInputService, TaxData} from '../user-input.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
// import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.css']
})

export class TaxTableComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['taxid', 'name', 'rank'];
  dataSource = new MatTableDataSource<TaxData>();
  displayTaxTable = true;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
      public UserInService: UserInputService,
  ) {
  }

  ngOnInit(): void {
    this.refreshTable();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.UserInService.shownTaxa;
  }

  refreshTable() {
    this.UserInService.taxaEmitter.subscribe((data: TaxData[]) => {
      this.dataSource.data = data;
    });
    console.log('refresh table');
  }

  deleteSelectedTaxIDs(){
    this.UserInService.selectedTaxa = [];
    // this.UserInService.shownTaxa$ = this.UserInService.selectedTaxa;
    this.dataSource.data = this.UserInService.selectedTaxa;
  }
}
