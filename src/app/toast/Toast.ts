export class Toast {
  id: string;
  type: ToastType;
  message: string;
  fade: boolean;

  constructor(init?: Partial<Toast>) {
    Object.assign(this, init);
  }
}

export enum ToastType {
  Error,
  Success
}
