import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('click') public openDropdown(eventData: Event) {
    (this.elementRef.nativeElement as HTMLElement)
      .ownerDocument
      .querySelectorAll('.dropdown-menu')
      .forEach((e) => e.classList.remove('show'));
    const dropElement: HTMLElement = this.renderer.nextSibling(this.elementRef.nativeElement);
    const offset = this.elementRef.nativeElement.offsetWidth + this.elementRef.nativeElement.offsetLeft - dropElement.offsetWidth;
    const manageDropdown = dropElement.classList.contains('show');
    if (!manageDropdown) {
      dropElement.classList.add('show');
      dropElement.style.left = `${offset}px`;
    } else {
      dropElement.classList.remove('show');
    }
  }
}
