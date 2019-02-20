import { ElementRef } from '@angular/core';

declare var M;

export interface MaterialModalInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialModalInstance{
  date?: Date;
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

  static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    })
  }
}
