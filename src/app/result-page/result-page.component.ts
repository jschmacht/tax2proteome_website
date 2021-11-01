import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  db_id: string;
  status: string = "";
  ready: boolean = false;
  result_url:string = "https://tax2proteome.de/downloader/";

  @ViewChild('bindingInput') bindingInput: ElementRef;

  constructor(
      private configService: ConfigService,) {
  }

  ngOnInit(): void {
  }

  getDownloadLink() {
    this.db_id = this.configService.result_link
    return this.db_id
  }

  setDownloadUrl(db_id){
    this.result_url = "https://tax2proteome.de/downloader/" + db_id;
    this.getDownloadUrl();
  }

  getDownloadUrl(){
    //console.log(this.result_url)
    return this.result_url;
  }

  CheckProgress() {
    this.db_id = this.bindingInput.nativeElement.value.trim();
    this.configService.getProgress(this.db_id).catch((err) => console.log('error: ', err));
    this.setDownloadUrl(this.db_id)
    setTimeout(() =>
        {
          this.status = this.configService.status
          if (this.status.startsWith('status 01')){
            this.ready = true;
          }
          return this.status
        },
        1000);
  }
}
