import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="overlay-load" *ngIf="showLoad">
                <p>  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> <br/>  <span> Cargando... </span>  </p>
            </div>`
})
export class LoadingComponent implements OnInit {
  @Input() showLoad:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
