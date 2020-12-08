import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Declare a variable in the template.
 * Eg. <i *ngVar="false as variable">{{ variable | json }}</i>
 */
@Directive({selector: '[ngVar]'})
export class NgVarDirective {
  public context: any = {};

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  @Input()
  set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  private updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
