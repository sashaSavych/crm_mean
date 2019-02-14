import { ElementRef } from '@angular/core';

declare var M;

export interface MaterialModalInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export class MaterialHelperService {
  static showToastMessage(message: string): void {
    M.toast({html: message})
  }

  static initFloatingButton(element: any) {
    M.FloatingActionButton.init(element);
  }

  static updateTextFields(): void {
    M.updateTextFields();
  }

  static initModal(positionModal: ElementRef): MaterialModalInstance {
    return M.Modal.init(positionModal.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialHelperService {
    return M.Tooltip.init(ref.nativeElement);
  }
}
