import { Component, OnInit,Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Input } from '@angular/core';
import { Time_backend,Rank_backend } from '../backend-communication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-core-en',
  templateUrl: './core-en.component.html',
  styleUrls: ['./core-en.component.css']
})
export class CoreEnComponent implements OnInit {

    public cwid:string;
    rank_status:number;
    language_selection = 1;
    timebackend : Time_backend[] = [];
    rankbackend : Rank_backend[] = [];

    headers = ["RANK","CWID","SECONDS"]

    backend_rank_url : string = "https://life2-bag-backend.azurewebsites.net/rank";
    backend_url : string = "https://life2-bag-backend.azurewebsites.net/get-time";

    id_1_list = ["🥢 Den Willen zum Erfolg leben", "🥢 Play to win"];
    id_2_list = ["🥢 Sinnstiftend führen", "🥢 Lead with purpose"];
    id_3_list = ["🥢 Sich und andere weiterentwicklen", "🥢 Grow yourself and others"];
    id_4_list = ["🥢 Nachhaltig handeln und Vorbild sein", "🥢 Act sustainably and be a role model"];
    id_5_list = ["🥢 Vertrauen aufbauen und Inklusion leben", "🥢 Build trust and be inclusive"];
    id_6_list = ["🥢 Zusammenarbeiten und Verbindungen schaffen", "🥢 Collaborate and connect"];
    id_7_list = ["🥢 Gemeinsam mit Kunden Wert schaffen", "🥢 Create value with the customer"];
    id_8_list = ["🥢 Innovativ sein und experementieren", "🥢 Innovate and experiment"];
    id_9_list = ["🥢 Digitalisierung stärken", "🥢 Go digital"];
    id_10_list = ["🥢 Verantwortung übernehmen", "🥢 Be accountable"];
    id_11_list = ["🥢 Schnell und pragmatisch handeln", "🥢 Be lean and fast"];
    id_12_list = ["🥢 Mutig sein und andere befähigen", "🥢 Be courageous and empower others"];

    leadership = [];

    integrity = [];

    flexibility = [];

    efficiency = [];

    todo = [{id:12,content:this.id_12_list[this.language_selection]},
            {id:3,content:this.id_3_list[this.language_selection]},
            {id:9,content:this.id_9_list[this.language_selection]},
            {id:2,content:this.id_2_list[this.language_selection]},
            {id:5,content:this.id_5_list[this.language_selection]},
            {id:8,content:this.id_8_list[this.language_selection]},
            {id:6,content:this.id_6_list[this.language_selection]},
            {id:11,content:this.id_11_list[this.language_selection]},
            {id:1,content:this.id_1_list[this.language_selection]},
            {id:4,content:this.id_4_list[Number(this.language_selection)]},
            {id:7,content:this.id_7_list[this.language_selection]},
            {id:10,content:this.id_10_list[this.language_selection]}];

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
