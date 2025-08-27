export abstract class Result<T, E> {
  // Add these properties to the base class
  readonly data?: T;
  readonly error?: E;
  
  abstract isSuccess(): this is Success<T, E>;
  abstract isFailure(): this is Failure<T, E>;

  handle(onSuccess: (data: T) => void, onFailure: (error: E) => void): void {
    if (this.isSuccess()) {
      onSuccess(this.data as T);
    } else {
      onFailure(this.error as E);
    }
  }
}

export class Success<T, E> extends Result<T, E> {
  constructor(public override readonly data: T) {
    super();
  }

  isSuccess(): this is Success<T, E> {
    return true;
  }

  isFailure(): this is Failure<T, E> {
    return false;
  }
}

export class Failure<T, E> extends Result<T, E> {
  constructor(public override readonly error: E) {
    super();
  }

  isSuccess(): this is Success<T, E> {
    return false;
  }

  isFailure(): this is Failure<T, E> {
    return true;
  }
}