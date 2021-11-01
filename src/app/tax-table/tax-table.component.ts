import {AfterViewInit, Component, OnChanges, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TaxData} from '../user-input.service';
import {UserInputService} from '../user-input.service';
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

  // dataChange: BehaviorSubject<TaxData[]> = new BehaviorSubject<TaxData[]>([])
  // DataArray = this.UserInputService.selectedTaxa

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild('table') table: MatTable<any>;

  constructor(
      public UserInService: UserInputService,
  ) {
  }

  ngOnInit(): void {
   this.dataSource.data = [...this.UserInService.shownTaxa];
   // data source input as observable
   // getTaxa().subscribe(taxa => {
   // this.dataSource.data = taxa;
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;});
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.UserInService.shownTaxa;
  }

  // all data are in dataSource.data but not shown!!!
  refreshTable(input) {
   // this.dataSource = new MatTableDataSource(input)
    this.dataSource.data = [...input];
    this.UserInService.shownTaxa = input;
    console.log( this.UserInService.selectedTaxa);
  }

  deleteSelectedTaxIDs(){
    this.UserInService.selectedTaxa = [];
    this.UserInService.shownTaxa = this.UserInService.selectedTaxa;
    this.dataSource.data = this.UserInService.selectedTaxa;
  }

  actualize_table(){
    this.dataSource.data = this.UserInService.shownTaxa;
  }

}
