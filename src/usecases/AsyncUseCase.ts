export interface AsyncUseCase<P, R> {
  execute(request: P): Promise<R>;
}
