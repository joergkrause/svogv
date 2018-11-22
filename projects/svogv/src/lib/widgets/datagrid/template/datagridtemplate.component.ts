import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
  Output
} from '@angular/core';
import { DynamicHTMLRenderer } from '../../../services/dynamichtmlrender.service';

@Component({
  selector: 'ac-datagrid-template',
  templateUrl: './gridtemplate.component.html',
  styleUrls: ['./gridtemplate.component.css']
})
export class GridtemplateComponent implements OnInit, AfterViewInit {
  @Input()
  field: string;
  @Input()
  show: boolean;

  templateData: any;

  constructor(
    private element: ElementRef,
    private renderer: DynamicHTMLRenderer
  ) {
    console.log('ctor gridtemplate');
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    console.log('after: ', this.element.nativeElement.innerHTML);
    if (this.show) {
      this.renderer.renderInnerHTML(
        this.element,
        this.element.nativeElement.innerHTML
      );
      this.templateData = this.element.nativeElement.innerHTML;
    }
  }
}
