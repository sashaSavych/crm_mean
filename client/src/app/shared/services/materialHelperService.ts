declare var M;

export class MaterialHelperService {
  static showToastMessage(message: string): void {
    M.toast({html: message})
  }
}
