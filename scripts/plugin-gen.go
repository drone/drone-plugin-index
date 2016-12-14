// +build ignore

// This program downloads the plugin documentation from the
// repository and generates a hugo template.

package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var (
	token = flag.String("token", os.Getenv("GITHUB_API_TOKEN"), "github api token")
	repo  = flag.String("repo", "drone-plugins/drone-git", "github repository")
)

func main() {
	flag.Parse()

	// downloads the documentation file.
	src := fmt.Sprintf("https://api.github.com/repos/%s/contents/DOCS.md", *repo)
	dst := fmt.Sprintf("content/%s.md", *repo)
	err := download(*token, src, dst)
	if err != nil {
		log.Fatal(err)
	}

	// downloads the logo file.
	src = fmt.Sprintf("https://api.github.com/repos/%s/contents/logo.svg", *repo)
	dst = fmt.Sprintf("static/logos/%s.svg", *repo)
	err = download(*token, src, dst)
	if err != nil {
		log.Fatal(err)
	}
}

func download(token, source, dest string) error {
	req, err := http.NewRequest("GET", source, nil)
	if err != nil {
		return err
	}
	if len(token) != 0 {
		req.Header.Add("Authorization", "token "+token)
	}
	req.Header.Add("Accept", "application/vnd.github.VERSION.raw")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// create parent directory if not exists
	d := filepath.Dir(dest)
	os.Mkdir(d, 0700)

	// copy to file
	f, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer f.Close()
	io.Copy(f, resp.Body)
	return nil
}
