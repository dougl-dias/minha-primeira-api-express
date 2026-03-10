const validadeId = (id: string): number => {
  const parsedId = Number(id)
  return !isNaN(parsedId) && parsedId > 0 ? parsedId : -1
}

export { validadeId }
