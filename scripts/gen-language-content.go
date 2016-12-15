// +build ignore

// This program copies the default language content for
// multiple langauge codes if translations do not exit.

package main

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var langs = []string{
	"es",
	"fr",
	"it",
	"pt",
	"zh-cn",
	"zh-tw",
	"ja",
	"ko",
	"ru",
}

func main() {

	matches, err := filepath.Glob("content/*/*/*.md")
	if err != nil {
		log.Fatal(err)
	}

	for _, match := range matches {
		b, err := ioutil.ReadFile(match)
		if err != nil {
			log.Fatal(err)
		}

		if ok, _ := filepath.Match("*.*.md", filepath.Base(match)); ok {
			continue
		}

		for _, lang := range langs {
			f := strings.Replace(match, ".md", "."+lang+".md", -1)
			if _, err := os.Stat(f); err == nil {
				continue
			}

			f = strings.Replace(match, ".md", ".gen."+lang+".md", -1)
			ioutil.WriteFile(f, b, 0700)
		}
	}
}
