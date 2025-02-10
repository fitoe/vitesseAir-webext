declare global {
  interface Inject {
    name: string
    command: string
    url: string
    method: string
  }

  interface InjectMessage {
    url: string
    data: any
  }
}
export { }
