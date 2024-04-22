package main

import (
    "log"
	"net/http"
	"github.com/labstack/echo/v5"
    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/apis"
    "github.com/pocketbase/pocketbase/core"
)

func main() {
    app := pocketbase.New()

    // serves static files from the provided public dir (if exists)
    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/findfamily/:code", func(c echo.Context) error {
			code := c.PathParam("code")
			
			record, err := app.Dao().FindFirstRecordByData("coordinators", "familyCode", code)
			
			if (err != nil) {return apis.NewNotFoundError("Family Not Found", "No family matches code")}

			return c.JSON(http.StatusOK, record)
		}, apis.ActivityLogger(app), apis.RequireRecordAuth())
		return nil;
	})

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
