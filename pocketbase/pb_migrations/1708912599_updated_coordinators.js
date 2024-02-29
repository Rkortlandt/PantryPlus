/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id || FamilyCodeUpdated = @hour"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hldpphp0",
    "name": "familyName",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0ov4x4r",
    "name": "familyMembers",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0iarb5abfj9atin",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vs36neuk",
    "name": "FamilyCode",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 6,
      "max": 6,
      "pattern": "^ [0-9]+$"
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wt2kblin",
    "name": "FamilyCodeUpdated",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id"

  // remove
  collection.schema.removeField("hldpphp0")

  // remove
  collection.schema.removeField("w0ov4x4r")

  // remove
  collection.schema.removeField("vs36neuk")

  // remove
  collection.schema.removeField("wt2kblin")

  return dao.saveCollection(collection)
})
