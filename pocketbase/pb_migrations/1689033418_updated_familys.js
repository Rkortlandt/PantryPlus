migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = "@request.auth.id != '' && Hidden = 'false'"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgzvpd5w",
    "name": "Hidden",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = null

  // remove
  collection.schema.removeField("sgzvpd5w")

  return dao.saveCollection(collection)
})
