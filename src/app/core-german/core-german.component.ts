import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Input } from '@angular/core';
import { Time_backend,Rank_backend } from '../backend-communication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-core-german',
  templateUrl: './core-german.component.html',
  styleUrls: ['./core-german.component.css']
})
export class CoreGermanComponent implements OnInit {

    public cwid:string;
    rank_status:number;
    language_selection = 0;
    timebackend : Time_backend[] = [];
    rankbackend : Rank_backend[] = [];

    headers = ["RANK","CWID","SECONDS"]
    headers_table = ["Platz","CWID","Sekunden"]

    backend_rank_url : string = "https://life2-international-backend.azurewebsites.net/rank";
    backend_url : string = "https://life2-international-backend.azurewebsites.net/get-time";

    id_1_list : string = "🥢 Den Willen zum Erfolg leben";
    id_2_list : string = "🥢 Sinnstiftend führen";
    id_3_list : string = "🥢 Sich und andere weiterentwicklen";
    id_4_list : string = "🥢 Nachhaltig handeln und Vorbild sein";
    id_5_list : string = "🥢 Vertrauen aufbauen und Inklusion leben";
    id_6_list : string = "🥢 Zusammenarbeiten und Verbindungen schaffen";
    id_7_list : string = "🥢 Gemeinsam mit Kunden Wert schaffen";
    id_8_list : string = "🥢 Innovativ sein und experementieren";
    id_9_list : string = "🥢 Digitalisierung stärken";
    id_10_list : string = "🥢 Verantwortung übernehmen";
    id_11_list : string = "🥢 Schnell und pragmatisch handeln";
    id_12_list : string = "🥢 Mutig sein und andere befähigen";

    leadership = [];

    integrity = [];

    flexibility = [];

    efficiency = [];

    todo = [{id:12,content:this.id_12_list},
            {id:3,content:this.id_3_list},
            {id:9,content:this.id_9_list},
            {id:2,content:this.id_2_list},
            {id:5,content:this.id_5_list},
            {id:8,content:this.id_8_list},
            {id:6,content:this.id_6_list},
            {id:11,content:this.id_11_list},
            {id:1,content:this.id_1_list},
            {id:4,content:this.id_4_list},
            {id:7,content:this.id_7_list},
            {id:10,content:this.id_10_list}];

    drop(event: CdkDragDrop<number[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
    };

    leadershipPredicate(item: CdkDrag<number>) {

      if ((item.data === 1) || (item.data === 2) || (item.data === 3)){
        return 1;}
      else{
        return 0;}

      };

    integrityPredicate(item: CdkDrag<number>) {

      if ((item.data === 4) || (item.data === 5) || (item.data === 6)){
        return 1;}
      else{
        return 0;}

      };

    flexibilityPredicate(item: CdkDrag<number>) {

      if ((item.data === 7) || (item.data === 8) || (item.data === 9)){
        return 1;}
      else{
        return 0;}

      };

    efficiencyPredicate(item: CdkDrag<number>) {

      if ((item.data === 10) || (item.data === 11) || (item.data === 12)){
        return 1;}
      else{
        return 0;}

      };

    noReturnPredicate() {
      return true;
    };

    public onValChange(val: number) {
      this.language_selection = val;
      }

  constructor(public dialog: MatDialog, private http : HttpClient) { }

  gettime(){

      this.http.get<Time_backend[]>(this.backend_url).subscribe(
      (response) => {
        this.timebackend["time"] = response["value"]
        this.rank_status = 1
      },
    )
  }

  getrank(){

      this.http.post<Rank_backend[]>(this.backend_rank_url,[this.timebackend['cwid'],this.timebackend['time']]).subscribe(
      (response) => {
        this.rankbackend = response['results'];
        this.rank_status = 0;
      },
    )
  }

  ngOnInit(): void {
    this.gettime()

  }
}
