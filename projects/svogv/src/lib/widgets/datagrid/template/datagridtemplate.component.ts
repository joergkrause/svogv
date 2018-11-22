import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { DynamicHtmlRendererService } from '../../../services/dynamichtmlrenderer.service';

@Component({
  selector: 'ac-datagrid-template',
  templateUrl: './datagridtemplate.component.html',
  styleUrls: ['./datagridtemplate.component.css']
})
export class DataGridTemplateComponent implements OnInit, AfterViewInit {
  @Input()
  field: string;
  @Input()
  show: boolean;

  templateData: any;

  constructor(
    private element: ElementRef,
    private renderer: DynamicHtmlRendererService
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
