import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }
  @Input() message: string;
  @Output() close = new EventEmitter();
  ngOnInit(): void {
  }
  onClose(){
    this.close.emit();
  }
  // ngOnChanges(changes: SimpleChanges){
  //   console.log("changes",changes);
  //   this.message = changes.message.currentValue;
  // }
}
