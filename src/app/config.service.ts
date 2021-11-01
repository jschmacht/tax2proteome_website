import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserInputService} from "./user-input.service";
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private rh: string
  private nr:string
  result_link:string = '';
  status:string = ""
  private myId = uuid.v4();
  private url = "https://tax2proteome.de/api/write_config.php"
  private url2 = "https://tax2proteome.de/api/get.php"

  constructor(
      private http: HttpClient,
      private userInputService: UserInputService,
      ) { }


  ngOnInit(): void {

  }

  getConfig<T>(): Observable<string> {
    if (this.userInputService.selectedDatabase =='NCBI-nr' && this.userInputService.selectedHeader=='reduced headers'){
      this.rh = '1';} else {this.rh = '0';}
    if (this.userInputService.selectedDatabase!='NCBI-nr' && this.userInputService.selectedRedundant=='non-redundant'){
      this.nr='1'} else{this.nr='0'}
    let taxa:number[]=[];
    this.userInputService.selectedTaxa.forEach((entry) => {
            taxa.push(entry.taxid);
    });
    let params = new HttpParams();
    if (taxa.length > 0) {
      params = params.set('id', taxa.toString());
    }
    if (this.userInputService.selectedDatabase=='NCBI-nr'){
      params = params.set('db', 'ncbi')
    }
    else{
      params = params.set('db', this.userInputService.selectedDatabase.toLowerCase().toString());
    }
    params = params.set('rank', this.userInputService.selectedRank.toLowerCase().toString());
    params = params.set('nr', this.nr.toString());
    params = params.set('rh', this.rh.toString());
    params = params.set('uid', this.myId.toString());
    const url_query = `${this.url}?${params.toString()}`;
    return this.http
        .get(url_query, {responseType: 'text'})
        .retry(3)
        .catch((err: any) => {
          return throwError('An error occurred:', err.error.message);
        })
    }

  async generateConfig(){
    try {
      this.result_link = await this.getConfig().toPromise();
    }
    catch(e){
      console.log('error: ', e);
      //handle exception
    }
  }

  getProgress2<T>(db_id): Observable<string> {
    let params = new HttpParams();
    params = params.set('db_id', db_id)
    const url_query = `${this.url2}?${params.toString()}`;
    return this.http
        .get(url_query, {responseType: 'text'})
        .retry(3)
        .catch((err: any) => {
          return throwError('An error occurred:', err.error.message);
        })
  }

  async getProgress(db_id){
    try {
      this.status = await this.getProgress2(db_id).toPromise();
    }
    catch(e){
      console.log('error: ', e);
      //handle exception
    }
  }
}
