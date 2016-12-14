// +build ignore

// This program runs the template generator for all plugins.

package main

import (
	"bufio"
	"bytes"
	"flag"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
)

var (
	token = flag.String("token", os.Getenv("GITHUB_API_TOKEN"), "github api token")
)

func main() {
	flag.Parse()

	f, err := ioutil.ReadFile("PLUGINS")
	if err != nil {
		log.Fatal(err)
	}
	r := bytes.NewReader(f)

	scanner := bufio.NewScanner(r)
	for scanner.Scan() {
		repo := scanner.Text()

		// skip empty lines
		if repo == "" {
			continue
		}

		// skip comment lines
		if strings.HasPrefix(repo, "#") {
			continue
		}

		log.Printf("generating docs for %s", repo)

		cmd := exec.Command("go", "run", "scripts/plugin-gen.go", "--repo", repo)
		cmd.Stderr = os.Stderr
		cmd.Stdout = os.Stdout
		err := cmd.Run()
		if err != nil {
			log.Printf("error generating docs for %s. exiting", repo)
		}
	}
}
