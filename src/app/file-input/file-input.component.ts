import { Component, OnInit } from '@angular/core';
import{TaxTableComponent} from "../tax-table/tax-table.component";
import {TaxData, UserInputService} from "../user-input.service";
import {NamesService} from "../names.service";

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  fileName: string = "No file selected";

  constructor(
      private taxTable: TaxTableComponent,
      private namesService: NamesService,
  ) { }

  ngOnInit(): void {
  }

  //upload function
  openFile(event) {
    if(event.target.files[0].size > 307200){
      alert("File is too big!");
      return;
    }
    if(event.target.files.length > 0)
    {
      this.fileName = event.target.files[0].name;
    }
    else {this.fileName = 'more than one file selected'}
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
      let reader = new FileReader();
      reader.readAsText(input.files[index]);
      reader.onload = () => {
        // this 'text' is the content of the file
        let text = reader.result;
        if (typeof text === "string") {
          const text_list = text.split(/,|\n|\t/).map(Number).filter(Boolean)
          let taxObject = this.namesService.getNames(text_list).catch((err)=> console.log('error: ', err))

        }
      }
    }
  }
}
