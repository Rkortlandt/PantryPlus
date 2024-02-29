/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vs36neuk",
    "name": "familyCode",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 6,
      "max": 6,
      "pattern": "^[a-z0-9]+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vs36neuk",
    "name": "familyCode",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 6,
      "max": 6,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
