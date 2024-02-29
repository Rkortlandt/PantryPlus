/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id || (familyCodeUpdated = @hour && @request.data.familyCode = familyCode)"

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wt2kblin",
    "name": "familyCodeUpdated",
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

  collection.listRule = "@request.auth.id = id || (FamilyCodeUpdated = @hour && @request.data.FamilyCode = FamilyCode)"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vs36neuk",
    "name": "FamilyCode",
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

  // update
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
})
