import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = '#e0f7fa';
  private defaultColor = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.defaultColor = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight || '#e0f7fa');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.defaultColor);
  }
}
