migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = null

  return dao.saveCollection(collection)
})
