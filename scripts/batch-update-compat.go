// + build ignore

// This program copies the default language content for
// multiple langauge codes if translations do not exit.

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"
)

func main() {

	matches, err := filepath.Glob("content/*/*/*.md")
	if err != nil {
		log.Fatal(err)
	}

	for _, match := range matches {
		if strings.HasPrefix(match, "content/drone-plugins/") {
			continue
		}

		if ok, _ := filepath.Match("*.*.md", filepath.Base(match)); ok {
			continue
		}

		b, err := ioutil.ReadFile(match)
		if err != nil {
			log.Fatal(err)
		}

		contents := string(b)
		contents = strings.TrimPrefix(contents, "---\n")
		contents = fmt.Sprintf(patch, contents)

		ioutil.WriteFile(match, []byte(contents), 0644)
	}
}

var patch = `---
version: '0.8'
%s
`
