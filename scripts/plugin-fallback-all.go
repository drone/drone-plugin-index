// +build ignore

// This program copies the default documentation and
// renames using the given language code. This helps
// provide fallback docs when translations do not exist.

package main

import (
	"io/ioutil"
	"log"
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

	matches, err := filepath.Glob("content/*/*.md")
	if err != nil {
		log.Fatal(err)
	}

	for _, match := range matches {
		b, err := ioutil.ReadFile(match)
		if err != nil {
			log.Fatal(err)
		}
		for _, lang := range langs {
			filename := strings.Replace(match, ".md", "."+lang+".md", -1)
			ioutil.WriteFile(filename, b, 0700)
		}
	}
}
