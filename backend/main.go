package main

import (
	"context"
	"log"
	"os"

	"github.com/google/go-github/github"
	"github.com/k0kubun/pp"
	"golang.org/x/oauth2"
)

func main() {
	c := NewClient(context.Background())
	err := c.ListSupportedRepositories(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	os.Exit(0)
}

const myUserName = "Code-Hex"

type Client struct {
	githubClient *github.Client
}

func NewClient(ctx context.Context) *Client {
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{
			AccessToken: "",
		},
	)
	return &Client{
		githubClient: github.NewClient(
			oauth2.NewClient(context.Background(), ts),
		),
	}
}

func (c *Client) ListSupportedRepositories(ctx context.Context) error {
	var supportedRepositories []*Repository
	for i := 0; ; i++ {
		starred, _, err := c.githubClient.Activity.ListStarred(ctx, "", &github.ActivityListStarredOptions{
			ListOptions: github.ListOptions{
				Page: i,
			},
		})
		if err != nil {
			return err
		}
		if len(starred) == 0 {
			break
		}
		for _, star := range starred {
			repo := star.GetRepository()
			owner := repo.Owner
			if username := owner.GetLogin(); myUserName != username {
				supportedRepositories = append(supportedRepositories, &Repository{
					Name:        repo.GetName(),
					FullName:    repo.GetFullName(),
					Description: repo.GetDescription(),
					URL:         repo.GetHTMLURL(),
					Language:    repo.GetLanguage(),
					ByUser:      username,
				})
			}
		}
	}
	pp.Println(supportedRepositories)
	return nil
}

type Repository struct {
	Name        string
	FullName    string
	Description string
	URL         string
	Language    string
	ByUser      string
}
