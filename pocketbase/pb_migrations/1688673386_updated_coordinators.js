migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fxclwr3z",
    "name": "familyName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  // remove
  collection.schema.removeField("fxclwr3z")

  return dao.saveCollection(collection)
})
