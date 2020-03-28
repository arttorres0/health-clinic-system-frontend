import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appTogglePassword]"
})
export class TogglePasswordDirective {
  private _shown = false;

  constructor(private el?: ElementRef) {
    this.setup();
  }

  toggle(checkbox: HTMLInputElement): void {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute("type", "text");
      checkbox.checked = true;
    } else {
      this.el.nativeElement.setAttribute("type", "password");
      checkbox.checked = false;
    }
  }

  setup(): void {
    const parent = this.el.nativeElement.parentNode;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    checkbox.addEventListener("change", event => {
      this.toggle(checkbox);
    });

    const span = document.createElement("span");
    span.innerHTML = "Mostrar";
    span.onclick = () => this.toggle(checkbox);
    parent.appendChild(checkbox);
    parent.appendChild(span);
  }
}
