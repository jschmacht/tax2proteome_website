import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TaxData} from "../user-input.service";
import {UserInputService} from "../user-input.service";
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
//import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.css']
})
export class TaxTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['taxid', 'name', 'rank'];
  dataSource = new MatTableDataSource<TaxData>();
  displayTaxTable: boolean = true;
//  dataChange: BehaviorSubject<TaxData[]> = new BehaviorSubject<TaxData[]>([])
  //DataArray = this.UserInputService.selectedTaxa

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator:MatPaginator;
  //@ViewChild('table') table: MatTable<any>;

  constructor(
      public UserInputService: UserInputService,
  ) {
  }

  ngOnInit(): void {
   this.dataSource.data = [...this.UserInputService.shownTaxa]
  //  data source input as observable
    //  getTaxa().subscribe(taxa => {
    //  this.dataSource.data = taxa;
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator
    this.dataSource.data = this.UserInputService.shownTaxa
  }

  // all data are in dataSource.data but not shown!!!
  refreshTable(input) {
   // this.dataSource = new MatTableDataSource(input)
    this.dataSource.data = [...input]
    this.UserInputService.shownTaxa = input
  }

  deleteSelectedTaxIDs(){
    this.UserInputService.selectedTaxa = [];
    this.UserInputService.shownTaxa = this.UserInputService.selectedTaxa;
        this.dataSource.data = this.UserInputService.selectedTaxa;
  }

  actualize_table(){
    this.dataSource.data = this.UserInputService.shownTaxa
  }

}
