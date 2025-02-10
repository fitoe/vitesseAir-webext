declare global {
  interface Role {
    id?: number
    name: string
    desc?: string
    createdAt?: string
    updatedAt?: string
  }
  interface RoleForm {
    name: string
    desc?: string
  }
}
export { }
