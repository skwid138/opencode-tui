export const createComponent = (comp: any, props: any) => comp(props)
export const createElement = (tagName: any) => ({ tagName, props: {}, children: [] })
export const insert = (parent: any, accessor: any) => {
  const value = typeof accessor === "function" ? accessor() : accessor
  if (Array.isArray(value)) parent.children.push(...value)
  else parent.children.push(value)
  return value
}
export const setProp = (element: any, name: any, value: any) => {
  element.props[name] = value
}
export const template = (str: string) => () => str
export const effect = (fn: any) => fn()
export const memo = (fn: any) => fn
export const mergeProps = (...args: any[]) => Object.assign({}, ...args)
export const splitProps = (props: any, ...keys: any[]) => {
  const split: any[] = []
  for (const k of keys) {
    const obj: any = {}
    for (const key of k) {
      obj[key] = props[key]
    }
    split.push(obj)
  }
  split.push(props)
  return split
}
